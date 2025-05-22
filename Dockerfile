FROM alpine:latest

WORKDIR /app

# 1. Copy file binary
COPY ./pocketbase/pocketbase /app/pocketbase

# 2. Copy dữ liệu nếu có
COPY ./pocketbase/pb_data /app/pb_data

# 3. Copy frontend (nếu có)
COPY ./pocketbase/public /app/public

# 4. Set quyền thực thi
RUN chmod +x /app/pocketbase

EXPOSE 8090

CMD ["/app/pocketbase", "serve", "--http=0.0.0.0:8090"]
