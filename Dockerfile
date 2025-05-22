# Dockerfile
FROM alpine:latest

WORKDIR /app

# Copy file binary
COPY ./pocketbase/pocketbase /app/pocketbase

# Optional: public folder (for SPA)
COPY ./pocketbase/public /app/public

# Optional: pb_data if bạn có dữ liệu sẵn
COPY ./pocketbase/pb_data /app/pb_data

# Cấp quyền thực thi
RUN chmod +x /app/pocketbase

EXPOSE 8090

# Chạy PocketBase
CMD ["/app/pocketbase", "serve", "--http=0.0.0.0:8090"]
