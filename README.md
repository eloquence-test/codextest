# codextest

This repository contains a minimal Next.js to-do application located in the
`todo-app` directory. A `podman-compose.yml` file is provided so you can start a
development environment without installing Node or PostgreSQL locally.

Run the following command to build the local container image and launch the
stack:

```bash
podman-compose up --build
```

The compose file builds the Node image from the repository, so it works even if
no registry is configured.
