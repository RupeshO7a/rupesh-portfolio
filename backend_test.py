#!/usr/bin/env python3
"""
Backend API Tests for Rupesh Portfolio
Tests all endpoints: /api/health, /api/contact (POST/GET), /api/stats
"""

import requests
import json
import sys
from datetime import datetime

# Read backend URL from frontend/.env
def get_backend_url():
    with open('/app/frontend/.env', 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                return line.split('=', 1)[1].strip()
    raise ValueError("REACT_APP_BACKEND_URL not found in frontend/.env")

BASE_URL = get_backend_url()
API_BASE = f"{BASE_URL}/api"

print(f"Testing backend at: {API_BASE}")
print("=" * 80)

# Track test results
test_results = {
    "passed": 0,
    "failed": 0,
    "errors": []
}

def test_result(name, passed, details=""):
    """Record test result"""
    if passed:
        test_results["passed"] += 1
        print(f"✅ PASS: {name}")
        if details:
            print(f"   {details}")
    else:
        test_results["failed"] += 1
        test_results["errors"].append(f"{name}: {details}")
        print(f"❌ FAIL: {name}")
        print(f"   {details}")
    print()

# ============================================================================
# TEST 1: GET /api/health
# ============================================================================
print("\n" + "=" * 80)
print("TEST 1: GET /api/health - MongoDB ping")
print("=" * 80)

try:
    response = requests.get(f"{API_BASE}/health", timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        if data.get("status") == "ok":
            test_result("GET /api/health returns 200 with status:ok", True, 
                       f"Response: {data}")
        else:
            test_result("GET /api/health returns 200 with status:ok", False,
                       f"Expected status:ok, got: {data}")
    else:
        test_result("GET /api/health returns 200 with status:ok", False,
                   f"Status code: {response.status_code}, Body: {response.text}")
except Exception as e:
    test_result("GET /api/health returns 200 with status:ok", False, str(e))

# ============================================================================
# TEST 2: POST /api/contact - Happy Path
# ============================================================================
print("\n" + "=" * 80)
print("TEST 2: POST /api/contact - Valid payload (Happy Path)")
print("=" * 80)

valid_payload = {
    "name": "Rajesh Kumar",
    "email": "rajesh.kumar@example.com",
    "message": "I am impressed by your AI/ML projects, especially the blockchain integration work. Would love to discuss potential collaboration opportunities."
}

try:
    response = requests.post(f"{API_BASE}/contact", json=valid_payload, timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        # Check required fields
        has_id = "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        has_status = data.get("status") == "received"
        has_created_at = "created_at" in data
        
        if has_id and has_status and has_created_at:
            test_result("POST /api/contact with valid payload returns 200", True,
                       f"Response: id={data['id']}, status={data['status']}, created_at={data['created_at']}")
            # Store the ID for later verification
            saved_message_id = data["id"]
        else:
            test_result("POST /api/contact with valid payload returns 200", False,
                       f"Missing required fields. Response: {data}")
    else:
        test_result("POST /api/contact with valid payload returns 200", False,
                   f"Status code: {response.status_code}, Body: {response.text}")
except Exception as e:
    test_result("POST /api/contact with valid payload returns 200", False, str(e))

# ============================================================================
# TEST 3: POST /api/contact - Validation Errors (422)
# ============================================================================
print("\n" + "=" * 80)
print("TEST 3: POST /api/contact - Validation Errors")
print("=" * 80)

# Test 3a: Missing name
print("Test 3a: Missing name field")
try:
    payload = {"email": "test@example.com", "message": "This is a test message with enough characters."}
    response = requests.post(f"{API_BASE}/contact", json=payload, timeout=10)
    
    if response.status_code == 422:
        test_result("POST /api/contact missing name returns 422", True,
                   f"Validation error as expected")
    else:
        test_result("POST /api/contact missing name returns 422", False,
                   f"Expected 422, got {response.status_code}. Body: {response.text}")
except Exception as e:
    test_result("POST /api/contact missing name returns 422", False, str(e))

# Test 3b: Invalid email
print("Test 3b: Invalid email format")
try:
    payload = {"name": "Test User", "email": "not-an-email", "message": "This is a test message with enough characters."}
    response = requests.post(f"{API_BASE}/contact", json=payload, timeout=10)
    
    if response.status_code == 422:
        test_result("POST /api/contact invalid email returns 422", True,
                   f"Validation error as expected")
    else:
        test_result("POST /api/contact invalid email returns 422", False,
                   f"Expected 422, got {response.status_code}. Body: {response.text}")
except Exception as e:
    test_result("POST /api/contact invalid email returns 422", False, str(e))

# Test 3c: Message too short (less than 10 chars)
print("Test 3c: Message shorter than 10 characters")
try:
    payload = {"name": "Test User", "email": "test@example.com", "message": "Short"}
    response = requests.post(f"{API_BASE}/contact", json=payload, timeout=10)
    
    if response.status_code == 422:
        test_result("POST /api/contact message < 10 chars returns 422", True,
                   f"Validation error as expected")
    else:
        test_result("POST /api/contact message < 10 chars returns 422", False,
                   f"Expected 422, got {response.status_code}. Body: {response.text}")
except Exception as e:
    test_result("POST /api/contact message < 10 chars returns 422", False, str(e))

# Test 3d: Name too short (less than 2 chars)
print("Test 3d: Name shorter than 2 characters")
try:
    payload = {"name": "A", "email": "test@example.com", "message": "This is a test message with enough characters."}
    response = requests.post(f"{API_BASE}/contact", json=payload, timeout=10)
    
    if response.status_code == 422:
        test_result("POST /api/contact name < 2 chars returns 422", True,
                   f"Validation error as expected")
    else:
        test_result("POST /api/contact name < 2 chars returns 422", False,
                   f"Expected 422, got {response.status_code}. Body: {response.text}")
except Exception as e:
    test_result("POST /api/contact name < 2 chars returns 422", False, str(e))

# ============================================================================
# TEST 4: GET /api/contact - List messages
# ============================================================================
print("\n" + "=" * 80)
print("TEST 4: GET /api/contact - List latest messages")
print("=" * 80)

try:
    response = requests.get(f"{API_BASE}/contact", timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        
        if isinstance(data, list):
            # Check if our previously inserted message appears
            found_message = False
            for msg in data:
                if (msg.get("name") == valid_payload["name"] and 
                    msg.get("email") == valid_payload["email"].lower() and 
                    msg.get("message") == valid_payload["message"]):
                    found_message = True
                    break
            
            if found_message:
                test_result("GET /api/contact returns list with inserted message", True,
                           f"Found message from {valid_payload['name']}. Total messages: {len(data)}")
            else:
                test_result("GET /api/contact returns list with inserted message", False,
                           f"Previously inserted message not found. Total messages: {len(data)}")
            
            # Verify sorting (desc by created_at)
            if len(data) > 1:
                dates = [msg.get("created_at") for msg in data if "created_at" in msg]
                if dates == sorted(dates, reverse=True):
                    test_result("GET /api/contact messages sorted by created_at desc", True)
                else:
                    test_result("GET /api/contact messages sorted by created_at desc", False,
                               "Messages not properly sorted")
        else:
            test_result("GET /api/contact returns list", False,
                       f"Expected list, got: {type(data)}")
    else:
        test_result("GET /api/contact returns 200", False,
                   f"Status code: {response.status_code}, Body: {response.text}")
except Exception as e:
    test_result("GET /api/contact returns 200", False, str(e))

# ============================================================================
# TEST 5: GET /api/stats - Aggregate stats
# ============================================================================
print("\n" + "=" * 80)
print("TEST 5: GET /api/stats - Aggregate statistics")
print("=" * 80)

try:
    response = requests.get(f"{API_BASE}/stats", timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        
        # Check structure
        has_total = "total_messages" in data and isinstance(data["total_messages"], int)
        has_impact = "impact" in data and isinstance(data["impact"], list)
        
        if has_total and has_impact:
            # Verify impact array has 4 objects with label/value/suffix
            impact_valid = len(data["impact"]) == 4
            if impact_valid:
                for item in data["impact"]:
                    if not all(k in item for k in ["label", "value", "suffix"]):
                        impact_valid = False
                        break
            
            if impact_valid:
                test_result("GET /api/stats returns correct structure", True,
                           f"total_messages={data['total_messages']}, impact array has 4 items")
                
                # Verify total_messages reflects the message we posted
                if data["total_messages"] >= 1:
                    test_result("GET /api/stats total_messages reflects posted message", True,
                               f"total_messages={data['total_messages']}")
                else:
                    test_result("GET /api/stats total_messages reflects posted message", False,
                               f"Expected at least 1 message, got {data['total_messages']}")
            else:
                test_result("GET /api/stats returns correct structure", False,
                           f"Impact array structure invalid: {data['impact']}")
        else:
            test_result("GET /api/stats returns correct structure", False,
                       f"Missing required fields. Response: {data}")
    else:
        test_result("GET /api/stats returns 200", False,
                   f"Status code: {response.status_code}, Body: {response.text}")
except Exception as e:
    test_result("GET /api/stats returns 200", False, str(e))

# ============================================================================
# TEST 6: POST another message and verify stats increment
# ============================================================================
print("\n" + "=" * 80)
print("TEST 6: Verify stats increment after posting another message")
print("=" * 80)

try:
    # Get current count
    response1 = requests.get(f"{API_BASE}/stats", timeout=10)
    count_before = response1.json()["total_messages"] if response1.status_code == 200 else 0
    
    # Post another message
    new_payload = {
        "name": "Priya Sharma",
        "email": "priya.sharma@techcorp.com",
        "message": "Your work on AI model optimization is remarkable. I'd like to explore how we can apply similar techniques in our healthcare AI projects."
    }
    response2 = requests.post(f"{API_BASE}/contact", json=new_payload, timeout=10)
    
    # Get new count
    response3 = requests.get(f"{API_BASE}/stats", timeout=10)
    count_after = response3.json()["total_messages"] if response3.status_code == 200 else 0
    
    if count_after == count_before + 1:
        test_result("Stats total_messages increments after POST", True,
                   f"Before: {count_before}, After: {count_after}")
    else:
        test_result("Stats total_messages increments after POST", False,
                   f"Expected {count_before + 1}, got {count_after}")
except Exception as e:
    test_result("Stats total_messages increments after POST", False, str(e))

# ============================================================================
# SUMMARY
# ============================================================================
print("\n" + "=" * 80)
print("TEST SUMMARY")
print("=" * 80)
print(f"Total Tests: {test_results['passed'] + test_results['failed']}")
print(f"✅ Passed: {test_results['passed']}")
print(f"❌ Failed: {test_results['failed']}")

if test_results["failed"] > 0:
    print("\nFailed Tests:")
    for error in test_results["errors"]:
        print(f"  - {error}")
    sys.exit(1)
else:
    print("\n🎉 All tests passed!")
    sys.exit(0)
