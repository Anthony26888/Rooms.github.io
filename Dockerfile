# Dockerfile (ở thư mục gốc)

FROM alpine:latest

WORKDIR /app

# Copy binary PocketBase
COPY ./pocketbase/pocketbase ./pocketbase
COPY ./pocketbase/pb_data ./pb_data

# Copy static frontend (nếu có)
COPY ./public ./pb_public

# Cấp quyền chạy binary
RUN chmod +x ./pocketbase

EXPOSE 8090

CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]
