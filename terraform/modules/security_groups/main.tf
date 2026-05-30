# ==========================================================
# Security Groups for Kubernetes Cluster Nodes
# ==========================================================

# 1. K8s Master Node Security Group
resource "aws_security_group" "master" {
  name        = "${var.environment}-k8s-master-sg"
  description = "Security group for Kubernetes Master control plane node"
  vpc_id      = var.vpc_id

  # SSH Administration from trusted admin IP (or CIDR block)
  ingress {
    description = "SSH administrative access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.admin_ip]
  }

  # Kubernetes API Server access (for developers / CI/CD)
  ingress {
    description = "Kube-API server public access"
    from_port   = 6443
    to_port     = 6443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Web Traffic (Ingress routing through Ingress Controller on Master)
  ingress {
    description = "HTTP Traffic"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS Traffic"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # NodePort access for Nginx Ingress Controller
  ingress {
    description = "K8s Ingress NodePort HTTP"
    from_port   = 30080
    to_port     = 30080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "K8s Ingress NodePort HTTPS"
    from_port   = 30443
    to_port     = 30443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Internal VPC cluster-wide communication
  ingress {
    description = "Full internal subnet communication"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.vpc_cidr]
  }

  # Outbound rule
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name        = "${var.environment}-k8s-master-sg"
    Environment = var.environment
  }
}

# 2. K8s Worker Nodes Security Group
resource "aws_security_group" "worker" {
  name        = "${var.environment}-k8s-worker-sg"
  description = "Security group for Kubernetes Worker node instances"
  vpc_id      = var.vpc_id

  # SSH Administration from trusted admin IP
  ingress {
    description = "SSH administrative access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.admin_ip]
  }

  # Allow NodePort TCP traffic from VPC or publicly (optional, VPC is safer)
  ingress {
    description = "K8s NodePort Services range"
    from_port   = 30000
    to_port     = 32767
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  # Full cluster internal VPC-wide communication
  ingress {
    description = "Full internal subnet communication"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.vpc_cidr]
  }

  # Outbound rule
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name        = "${var.environment}-k8s-worker-sg"
    Environment = var.environment
  }
}
