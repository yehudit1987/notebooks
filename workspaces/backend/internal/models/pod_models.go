package models

type PodMetadata struct {
	Labels      map[string]string `json:"labels"`
	Annotations map[string]string `json:"annotations"`
}

type ImageConfig struct {
	Current       string     `json:"current"`
	Desired       string     `json:"desired"`
	RedirectChain []Redirect `json:"redirect_chain"`
}

type Redirect struct {
	Source string `json:"source"`
	Target string `json:"target"`
}

type PodConfig struct {
	Values []string `json:"values"`
}
