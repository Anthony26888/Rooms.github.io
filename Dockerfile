# Dockerfile (ở thư mục gốc)

FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache curl unzip && \
    curl -L -o pb.zip https://github.com/pocketbase/pocketbase/releases/download/v0.22.8/pocketbase_0.22.8_linux_amd64.zip && \
    unzip pb.zip && \
    chmod +x pocketbase && \
    rm pb.zip

# Copy PocketBase binary
COPY ./pocketbase/pocketbase /app/pocketbase

# Optional: copy pb_data if you have existing data
# (comment out if not needed)
COPY ./pocketbase/pb_data /app/pb_data

# Optional: copy frontend static files
# (comment out if not using frontend with PocketBase)
COPY ./pocketbase/public /app/public
# Cấp quyền chạy binary
RUN chmod +x ./pocketbase

EXPOSE 8090

CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]
