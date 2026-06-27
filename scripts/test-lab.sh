#!/bin/bash

echo "============================================"
echo "   Docker Fullstack Networking Lab - Test"
echo "============================================"

echo -e "\n[1] Checking running containers..."
docker compose ps

echo -e "\n[2] Testing Backend Health..."
curl -s http://localhost:5000/health || echo "Backend not responding"

echo -e "\n[3] Testing Frontend..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080

echo -e "\n[4] Network Information:"
echo "Backend container networks:"
docker inspect backend-api --format '{{json .NetworkSettings.Networks}}' | python3 -m json.tool 2>/dev/null || echo "jq not available, showing raw..."

echo -e "\n✅ Lab test completed!"
echo "Open http://localhost:8080 in your browser to test the application."