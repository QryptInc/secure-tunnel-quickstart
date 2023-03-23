FROM qryptdev001/securetunnel-envoy:1.0.0

# Copy both configs so we can use the same image for
# either sender or receiver
COPY envoy*.yml /etc/

RUN chmod go+r /etc/envoy.sender.yml && \
    chmod go+r /etc/envoy.receiver.yml

# CMD needs to be an envoy config file
ENTRYPOINT [ "/usr/local/bin/envoy", "-l", "warn", "-c" ]
