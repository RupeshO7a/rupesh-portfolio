#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: |
  Build a high-end 3D, dynamic professional portfolio for Bethapudi Rupesh
  (AI/ML Engineer, B.Tech CSE, Kalasalingam) using resume content + uploaded
  full-cover photo. Backend: persist contact form messages and expose stats.

backend:
  - task: "POST /api/contact - validate & persist contact messages"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Implemented with Pydantic validation (name 2-80, valid email, message 10-2000). Persists to mongo collection contact_messages with uuid id and utc created_at."
        - working: true
          agent: "testing"
          comment: "✅ All tests passed. Happy path: valid payload returns 200 with id, status:received, created_at. Validation errors: missing name (422), invalid email (422), message < 10 chars (422), name < 2 chars (422). Data persists correctly to MongoDB."

  - task: "GET /api/contact - list latest messages"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Returns latest N (default 50, max 200) sorted by created_at desc, strips _id."
        - working: true
          agent: "testing"
          comment: "✅ Verified working. Returns list of messages with all fields (id, name, email, message, created_at). Previously inserted messages appear correctly. Messages properly sorted by created_at descending."

  - task: "GET /api/stats - aggregate stats"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Returns total_messages count + static IMPACT_STATS array."
        - working: true
          agent: "testing"
          comment: "✅ Verified working. Returns correct structure with total_messages (int) and impact array (4 objects with label/value/suffix). total_messages accurately reflects count in database and increments correctly after new POST."

  - task: "GET /api/health - mongo ping"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Pings mongo, returns ok or 503."
        - working: true
          agent: "testing"
          comment: "✅ Verified working. Returns 200 with {status:ok}. MongoDB connection healthy."

frontend:
  - task: "Contact form wired to POST /api/contact"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/Contact.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Replaced localStorage mock with axios POST to ${REACT_APP_BACKEND_URL}/api/contact. Toasts on success/failure."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: false

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    - agent: "main"
      message: |
        Backend implemented at /app/backend/server.py with 4 endpoints under /api prefix.
        Please test:
          1. POST /api/contact with valid + invalid payloads (missing fields, bad email, short message).
          2. GET /api/contact returns the inserted record(s).
          3. GET /api/stats reflects total_messages count.
          4. GET /api/health returns 200 ok.
        Use REACT_APP_BACKEND_URL from frontend/.env as base. All routes prefixed with /api.
    - agent: "testing"
      message: |
        ✅ Backend testing complete - ALL 10 TESTS PASSED
        
        Tested all 4 endpoints comprehensively:
        1. GET /api/health - MongoDB ping working, returns 200 with status:ok
        2. POST /api/contact - Happy path working (returns id, status:received, created_at)
        3. POST /api/contact - All validation errors working (422 for missing name, invalid email, short message, short name)
        4. GET /api/contact - Returns list of messages, properly sorted by created_at desc
        5. GET /api/stats - Returns correct structure (total_messages + impact array with 4 items)
        6. Stats increment - total_messages increments correctly after POST
        
        All backend APIs are functioning correctly with proper validation, data persistence, and error handling.
        No critical or major issues found. Backend is production-ready.
