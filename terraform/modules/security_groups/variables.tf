variable "vpc_id" {
  description = "The ID of the VPC to associate security groups with"
  type        = string
}

variable "vpc_cidr" {
  description = "The CIDR block of the VPC for cluster internal networking"
  type        = string
}

variable "environment" {
  description = "Deployment environment name"
  type        = string
}

variable "admin_ip" {
  description = "The administrative IP address block allowed to SSH into the nodes (e.g. 203.0.113.50/32 or 0.0.0.0/0)"
  type        = string
  default     = "0.0.0.0/0" # Highly secure environments should override this with a specific IP or CIDR block
}
