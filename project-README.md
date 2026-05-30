# Complete Production-Grade Self-Managed Kubernetes Infrastructure on AWS

This repository contains the complete, production-grade source code to provision, configure, deploy, and automate a containerized application onto a self-managed Kubernetes cluster running on AWS EC2 nodes.

---

## Repository Structure

```
project/
├── app/                  # Node.js Express Application (Jest, Supertest, Multi-stage Docker)
├── terraform/            # Infrastructure as Code (VPC, Security Groups, EC2 modules)
│   ├── modules/          # Reusable infra building blocks (vpc, sg, ec2)
│   ├── environments/     # Target environment parameters (dev)
│   └── backend.tf        # Remote State configuration template
├── ansible/              # Configuration Management (Docker, containerd, kubeadm, CNI, Helm)
│   ├── inventory/        # Node IP mapping (hosts.yaml, group_vars)
│   ├── playbooks/        # Phase orchestration playbooks (site.yml, install-k8s, master, worker)
│   └── roles/            # Component automation roles (common, kubernetes, master, worker)
├── kubernetes/           # Production Manifests (namespace, deployment, service, ingress, HPA)
├── .github/              # Automation Workflows
│   └── workflows/        # GitHub Actions CI/CD configuration (deploy.yml)
└── docs/                 # High-Fidelity Explanations & Diagrams
    ├── architecture.md   # Network, choices rationale, EKS vs. self-managed, AWS pricing tables
    ├── deployment_flow.md# Mermaid diagrams tracing CI/CD pipeline steps
    └── troubleshooting.md# Operational runbook for recovery from standard failures
```

---

## Detailed Tech Explanations

For in-depth explanations on technical decisions and cost estimations, see:
* [Architectural Choices & Cost Analysis](docs/architecture.md)
* [Continuous Integration & Delivery Flow](docs/deployment_flow.md)
* [Cluster Troubleshooting & Diagnostics Manual](docs/troubleshooting.md)

---

## Step-by-Step Cluster Setup Runbook

### 1. Prerequisites
Ensure you have the following installed on your local control workstation:
* **Terraform** (`>= 1.5.0`)
* **Ansible** (`>= 2.12.0`)
* **AWS CLI** configured with appropriate admin IAM credentials (`aws configure`)
* An active **Docker Hub** account and a public GitHub Repository

---

### 2. Infrastructure Provisioning (Terraform)
1. Navigate to the development environment folder:
   ```bash
   cd terraform/environments/dev
   ```
2. Copy the example tfvars file and adapt variables (e.g. restrict SSH `admin_ip` access):
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```
3. Initialize Terraform providers and download modules:
   ```bash
   terraform init
   ```
4. Preview the infrastructure modifications:
   ```bash
   terraform plan
   ```
5. Apply changes and provision all AWS resources:
   ```bash
   terraform apply -auto-approve
   ```
   * **Wait ~2 minutes** for AWS to compile instances and routing tables.
   * **Auto-generated Outputs**: 
     - Generates the SSH private key file `dev-k8s-key.pem` in `terraform/environments/dev/` and sets permissions to `0600`.
     - Automatically updates and saves the dynamic host IP definitions into `ansible/inventory/hosts.yaml`!

---

### 3. Server Configuration & Kubernetes Initialization (Ansible)
Ansible handles cluster OS configurations, binaries setup, container runtimes execution, Helm chart deployments, and node joining.

1. Navigate to the ansible directory:
   ```bash
   cd ../../../ansible
   ```
2. Test connection and SSH access to the newly created EC2 nodes using ansible ad-hoc ping:
   ```bash
   ansible all -m ping -i inventory/hosts.yaml
   ```
3. Run the orchestration playbook to provision the entire cluster:
   ```bash
   ansible-playbook -i inventory/hosts.yaml playbooks/site.yml
   ```
   * **What this does**:
     1. Disables swap space persistently on all nodes.
     2. Configures container runtime prereqs (kernel mods overlay/br_netfilter, network forward rules).
     3. Installs Docker CE & Containerd on all nodes, setting SystemdCgroup compatibility.
     4. Installs pinned `kubelet`, `kubeadm`, and `kubectl` binaries.
     5. Initializes the control plane on the Master node.
     6. Configures `kubectl` local environment for the `ubuntu` user.
     7. Installs Calico as the cluster-wide Container Network Interface (CNI).
     8. Installs Helm and provisions Nginx Ingress Controller (mapped to NodePort 30080/30443).
     9. Installs Cert-Manager and creates a production ClusterIssuer for automated Let's Encrypt SSL.
     10. Generates a token and automatically registers and joins the Worker nodes.

---

### 4. Setting up GitHub Secrets & CI/CD Pipeline
To trigger automated continuous delivery upon push:
1. Navigate to your repository's **Settings > Secrets and variables > Actions** page.
2. Register the following secrets securely:

| Secret Name | Value Description | Example Value |
| :--- | :--- | :--- |
| `DOCKER_HUB_USERNAME` | Your Docker Hub Username | `myuser` |
| `DOCKER_HUB_TOKEN` | Your Docker Hub Personal Access Token (PAT) | `dckr_pat_...` |
| `EC2_MASTER_PUBLIC_IP` | The public Elastic IP of the K8s Master (displayed in Terraform output) | `54.210.12.8` |
| `EC2_SSH_PRIVATE_KEY` | The contents of the generated PEM file `dev-k8s-key.pem` | `-----BEGIN RSA PRIVATE KEY-----...` |

---

### 5. Running and Verifying the Deployment
1. Push changes to the `main` branch of your GitHub repository.
2. Monitor progress on the **Actions** tab of your GitHub repository.
3. Once completed successfully, log into the master node via SSH to verify cluster workloads:
   ```bash
   ssh -i terraform/environments/dev/dev-k8s-key.pem ubuntu@<MASTER_PUBLIC_IP>
   ```
4. Verify the active workloads:
   ```bash
   # Check pod status (should show 3 replicas running)
   kubectl get pods -n production-app
   
   # Check service endpoints
   kubectl get svc -n production-app
   
   # Check HPA scaling status
   kubectl get hpa -n production-app
   
   # Check active ingress ssl status
   kubectl get ingress -n production-app
   ```
5. Test application endpoints using curl from the outside world:
   ```bash
   curl -i http://<MASTER_PUBLIC_IP>:30080/
   curl -i http://<MASTER_PUBLIC_IP>:30080/health
   ```

---

### 6. Infrastructure Cleanup (Teardown)
To avoid charges, easily tear down all provisioned resources:
1. Navigate to the terraform dev environment folder:
   ```bash
   cd terraform/environments/dev
   ```
2. Execute the destruction sequence:
   ```bash
   terraform destroy -auto-approve
   ```
   * This instantly removes the instances, security groups, route tables, Elastic IPs, and NAT Gateway, ensuring no recurring AWS billing.
