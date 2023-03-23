# Secure Tunnel Quickstart

This repository contains a demo application for Qrypt's Secure Tunnel product.
It is meant for demonstration purposes only, and is not suitable for a production environment.

## Introduction
---

Secure Tunnel is a custom Envoy HTTP filter that can be used that can be used to enable quantum secure
transmission channels. 

This achieved by using proxies on both the sender and receiver ends of a channel. The proxies
use Qrypt's quantum secure key generation technology to generate encryption keys and perform One Time Pad
encryption/decryption on each end of the channel, without any keys ever being stored or transmitted.

![](docs/secure-tunnel-overview.png)

## Docker Image
---

Secure Tunnel is publicly available on Docker Hub.

```bash
docker pull qryptdev001/securetunnel-envoy:1.0.0
```
The image contains a custom build of Envoy with Secure Tunnel statically linked into it.

The binary is at `/usr/local/bin/envoy`.

## Requirements
---

To run this demo you will need to:

1. Install `docker-compose`
2. Create a Qrypt [portal](https://portal.qrypt.com) account
3. Generate a Qrypt usage token (this can be done on the portal)

## Setup
---

In `proxies/envoy.sender.yml` and `proxies/envoy.receiver.yml`, replace the `{YOUR_QRYPT_TOKEN}` placeholder with a valid usage token. Then, run

```bash
$ docker-compose up --build
```

## Demo 
---

The services in this demo are intended to give the user a means of inspecting an arbitrary message as it passes through the various stages of encryption and decryption.

The `entrypoint` service listens for `POST` requests on port `3000` on the host. 

> **NOTE:**   Requests must have a `Content-Type: application/json` header.

Requests are logged and forwarded to the Envoy `sender-proxy`, which then forwards the request to an intermediary `eavesdropper` service. 

The `eavesdropper` service logs the message it receives from the `sender-proxy` before forwarding it to the `listener-proxy`.

The `listener-proxy` then decrypts the message and forwards it to the `recipient` service, which finally logs the decrypted plaintext message. 

![](docs/secure-tunnel-demo.png)

To send a message through the demo tunnel, run

```bash
$ curl -d '{"someKey":"someValue"}' -H "Content-Type: application/json" -X POST http://localhost:3000
```
