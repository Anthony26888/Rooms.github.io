# Dockerfile (ở thư mục gốc)

FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache curl unzip && \
    curl -L -o pb.zip https://github.com/pocketbase/pocketbase/releases/download/v0.22.8/pocketbase_0.22.8_linux_amd64.zip && \
    unzip pb.zip && \
    chmod +x pocketbase && \
    rm pb.zip

# Copy binary PocketBase
COPY ./pocketbase/pocketbase ./pocketbase
COPY ./pocketbase/pb_data ./pb_data

# Copy static frontend (nếu có)
COPY ./public ./pb_public

# Cấp quyền chạy binary
RUN chmod +x ./pocketbase

EXPOSE 8090

CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]
