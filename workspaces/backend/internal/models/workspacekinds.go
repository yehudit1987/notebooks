/*
 *
 * Copyright 2024.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * /
 */

package models

import (
	kubefloworgv1beta1 "github.com/kubeflow/notebooks/workspaces/controller/api/v1beta1"
)

type WorkspaceKindModel struct {
	Name string `json:"name"`
	// Namespace    string            `json:"namespace"`
	// DeferUpdates bool              `json:"defer_updates"`
	// Paused       bool              `json:"paused"`
	// PausedTime   int64             `json:"paused_time"`
	// State        string            `json:"state"`
	// StateMessage string            `json:"state_message"`
	PodTemplate PodTemplateModel `json:"pod_template"`
}
type PodTemplateModel struct {
	PodMetadata PodMetadata `json:"pod_metadata"`
	ImageConfig ImageConfig `json:"image_config"`
	PodConfig   PodConfig   `json:"pod_config"`
}

// type PodMetadata struct {
// 	Labels      map[string]string `json:"labels"`
// 	Annotations map[string]string `json:"annotations"`
// }

// type Volumes struct {
// 	Home Volume   `json:"home"`
// 	Data []Volume `json:"data"`
// }

// type Volume struct {
// 	PVCName   string `json:"pvc_name"`
// 	MountPath string `json:"mount_path"`
// 	ReadOnly  bool   `json:"read_only"`
// }

// type ImageConfig struct {
// 	Current       string     `json:"current"`
// 	Desired       string     `json:"desired"`
// 	RedirectChain []Redirect `json:"redirect_chain"`
// }

// type Redirect struct {
// 	Source string `json:"source"`
// 	Target string `json:"target"`
// }

// type PodConfig struct {
// 	Current       string     `json:"current"`
// 	Desired       string     `json:"desired"`
// 	RedirectChain []Redirect `json:"redirect_chain"`
// }

type ResourceModel struct {
	Cpu    string `json:"cpu"`
	Memory string `json:"memory"`
}

func NewWorkspaceKindModelFromWorkspaceKind(item *kubefloworgv1beta1.WorkspaceKind) WorkspaceKindModel {

	var image_redirect_chain []Redirect
	for _, item := range item.Spec.PodTemplate.Options.ImageConfig.Values {
		if item.Redirect != nil {
			image_redirect_chain = append(image_redirect_chain, Redirect{Source: item.Id, Target: item.Redirect.To})
		}
	}

	var pod_redirect_chain []Redirect
	for _, item := range item.Spec.PodTemplate.Options.PodConfig.Values {
		if item.Redirect != nil {
			pod_redirect_chain = append(pod_redirect_chain, Redirect{Source: item.Id, Target: item.Redirect.To})
		}
	}

	labels := make(map[string]string)
	if item.Spec.PodTemplate.PodMetadata.Labels != nil {
		labels = item.Spec.PodTemplate.PodMetadata.Labels
	}
	annotations := make(map[string]string)
	if item.Spec.PodTemplate.PodMetadata.Annotations != nil {
		annotations = item.Spec.PodTemplate.PodMetadata.Annotations
	}

	var pod_config_values []string
	for _, item := range item.Spec.PodTemplate.Options.PodConfig.Values {
		pod_config_values = append(pod_config_values, item.Id)
	}

	// cpuValues := make([]string, len(item.Spec.PodTemplate.Options.PodConfig.Values))
	// memoryValues := make([]string, len(item.Spec.PodTemplate.Options.PodConfig.Values))
	// for i, value := range item.Spec.PodTemplate.Options.PodConfig.Values {
	// 	cpuValues[i] = value.Spec.Resources.Requests.Cpu().String()
	// 	memoryValues[i] = value.Spec.Resources.Requests.Memory().String()
	// }

	workspaceKindModel := WorkspaceKindModel{
		Name: item.Name,
		PodTemplate: PodTemplateModel{
			PodMetadata: PodMetadata{
				Labels:      labels,
				Annotations: annotations,
			},
			ImageConfig: ImageConfig{
				Current:       item.Spec.PodTemplate.Options.ImageConfig.Spawner.Default,
				Desired:       item.Spec.PodTemplate.Options.ImageConfig.Spawner.Default,
				RedirectChain: image_redirect_chain,
			},
			PodConfig: PodConfig{
				Values: pod_config_values,
			},
		},
	}

	return workspaceKindModel
}
