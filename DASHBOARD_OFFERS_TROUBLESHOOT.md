# Dashboard Offers Not Showing - Troubleshooting Guide

## Problem Summary
- User (luis l luis) is not seeing offers in the Dashboard's "Offers" tab
- Sent offers tab shows nothing (should show 4 offers sent)
- Received offers tab shows nothing (should show 2 offers received)

## Investigation Findings

### ✅ What IS Working
- **Database**: All trades exist correctly in the database
  - User 30 has 2 RECEIVED offers (trades 118, 117) - seller_id=30
  - User 30 has 4 SENT offers (trades 121, 120, 119, 116) - buyer_id=30
  
- **Backend API**: The GetTrades handler logic is correct
  - Direction="incoming" correctly filters `seller_id = userID` 
  - Direction="outgoing" correctly filters  `buyer_id = userID`
  - Status="pending" correctly filters for pending or pending_multiway trades

- **Frontend Hooks**: useReceivedOffers and useSentOffers hooks are correctly set up
  - They call `/api/trades?direction=incoming&status=pending` and
  - They call `/api/trades?direction=outgoing&status=pending`

### 🔍 Possible Root Causes

1. **Authentication Token Expired/Invalid**
   - JWT tokens expire after 7 days
   - If user hasn't logged in recently, token might be stale

2. **API Not Being Called**
   - Frontend might not be making the requests  
   - Or requests are being blocked (CORS, network issue)

3. **API Returning Empty Data**
   - User context extraction failing (middleware.GetUserIDFromContext)
   - Query parameters not being parsed correctly
   - API returning successful response but with empty data array

## Troubleshooting Steps

### Step 1: Check Browser Developer Tools
1. Open your browser
2. Press **F12** to open Developer Tools
3. Go to **Network** tab
4. Refresh the Dashboard page
5. Look for API calls like:
   - `/api/trades?direction=incoming&status=pending`
   - `/api/trades?direction=outgoing&status=pending`

**What to look for:**
- Are these requests being made? (YES = API is being called)
- What is the response status? (200 = OK, 401 = Not authenticated, 500 = Server error)
- What does the response body show? Click on the request and check **Response** tab
  - Should see: `{"success":true,"data":[...]}`  with trades listed

### Step 2: Check Browser Console
1. Go to **Console** tab in Developer Tools
2. Look for any error messages
3. Look for`[DEBUG] useReceivedOffers raw response` messages
   - These are logged by the frontend API calls
   - Will show exactly what the API returned

### Step 3: Test API Directly
If trades aren't showing up:

1. Get your auth token from browser:
   - Open Console and run: `localStorage.getItem('clovia_token')`
   - Copy the token (it's a long string starting with `eyJ...`)

2. Test in your terminal (replace TOKEN with actual token):
```bash
curl -H "Authorization: Bearer TOKEN" \
  "http://localhost:4000/api/trades?direction=incoming&status=pending"
```

Expected response:
```json
{
  "success": true,
  "data": [
    {
      "id": 118,
      "buyer_id": 13,
      "seller_id": 30,
      "target_product_id": 249,
      "status": "pending",
      ...
    },
    ...
  ]
}
```

### Step 4: Check Backend Server Logs
If API is not working:

1. Look at backend logs where you started the Go server
2. Search for `[DEBUG] GetTrades START` messages
3. These logs will show:
   - Whether requests are being received
   - What UserID is being extracted
   - What the WHERE clause looks like
   - How many trades were found

**Example log output:**
```
[DEBUG] GetTrades START: UserID=30, Status=pending, Direction=incoming, Limit=100
[DEBUG] GetTrades: WHERE clause=WHERE t.seller_id = ?, Args=[30]
[DEBUG] GetTrades: Found 2 trades for UserID 30
[DEBUG] GetTrades: Returning 2 trades in APIResponse
```

### Step 5: Force Re-login
If authentication is the issue:

1. Open Developer Tools → Application/Storage tab
2. Delete `clovia_token` from localStorage
3. Delete `clovia_user` from localStorage
4. Refresh the page
5. Log in again
6. Check if offers now show up

## Common Issues & Fixes

### Issue: API returns 401 "Invalid or expired token"
**Fix**: Log out and log in again
```
Settings → Log Out → Log back in
```

### Issue: API throws 500 error "User not authenticated"
**Possible causes:**
- Authentication middleware not extracting user ID from JWT
- JWT secret mismatch between frontend/backend
**Fix**: Restart backend server and ensure `JWT_SECRET` env var is set

### Issue: API returns success but data is empty array `[]`
**Possible causes:**
- User ID extraction is returning wrong ID
- Trades exist but don't match query parameters
**Debug**: Check backend logs to see what user ID and WHERE clause were used

### Issue: Console shows no  `[DEBUG]` messages
**This means:** The API request is NOT being made at all
**Possible causes:**
- useReceivedOffers hook not triggering
- Frontend has an error preventing the fetch
**Fix**: Check Console tab for JavaScript errors

## File Locations for Reference
- **Frontend API hooks**: `client/src/hooks/useDashboard.ts` (lines 108-140)
- **Backend handler**: `handlers/trade_handler.go` (line 884)
- **API route setup**: `main.go` (lines 509-511)
- **Database query test**:  `test_api_direct.go` (manual test file)

## Next Steps if Still Not Working

If after all thisthe offers still aren't showing:

1. **Run the test program** to verify database queries work:
   ```bash
   go run test_api_direct.go
   ```
   This will directly query the database bypassing the API

2. **Check if this is user-specific**:
   - Does another user see their offers?
   - If yes, it's a user authentication issue
   - If no, it's a general API/database issue

3. **Post logs** (with debug output) for manual review

## Recommended Actions

1. **First**: Check the Network tab to see if API is being called
2. **Second**: Check the Console for any [DEBUG] messages
3. **Third**: Run the curl test to verify API is working
4. **Fourth**: Force re-login
5. **Fifth**: Check backend logs for [DEBUG] messages

---

**STATUS**: Enhanced logging has been added to the backend (Git: trade_handler.go line 1169+). These will help diagnose the exact point of failure.

If you provide the Network response and Console debug output, I can help identify the root cause more specifically.
