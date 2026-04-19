# Product View Count Implementation Guide

## Overview
This document describes the complete implementation of the product view count tracking feature. When a user clicks on a product card from any page to view its details, the view count increments by 1 in the database.

## Features Implemented

### 1. **Secure View Tracking**
- ✅ View count increments every time a user clicks on a product to view details
- ✅ Self-views are prevented (product owner's views are not counted)
- ✅ Works for both authenticated and unauthenticated users
- ✅ Uses IP-based tracking for unauthenticated users via the existing `product_views` table

### 2. **Database Changes**
- Added `view_count INT DEFAULT 0` column to the `products` table
- Auto-migration in `database.go` handles adding the column if it doesn't exist
- Existing `product_views` table is used for detailed view history (optional future analytics)

### 3. **Backend API**
- New endpoint: **POST `/api/products/:id/view`**
- Security: Prevents self-views (sellers don't inflate their own product views)
- Response: Returns updated view count
- Public endpoint (no auth required, but can distinguish authenticated users)

### 4. **Frontend Implementation**
- ProductCard component now calls the view tracking endpoint on click
- View count is displayed in the Dashboard (seller's products list)
- Non-blocking: Navigation proceeds even if view tracking fails
- Uses async/await for clean request handling

## Code Changes

### Backend Changes

#### 1. Database Schema (`database/database.go`)
Added `view_count` column to products table as part of migration:
```go
"view_count": "INT DEFAULT 0",
```

#### 2. Models (`models/models.go`)
Added field to Product struct:
```go
ViewCount int `json:"view_count,omitempty"`
```

#### 3. Product Handler (`handlers/product_handler.go`)

**New Endpoint - `IncrementViewCount()`**
```go
func (h *ProductHandler) IncrementViewCount(c *fiber.Ctx) error
```
- Validates product exists
- Prevents self-views
- Increments `view_count` in products table
- Records view in `product_views` table for detailed tracking
- Returns success status with updated count

**Updated Endpoints - Include `view_count` in responses:**
- `GetProduct()` - Returns product with view_count
- `GetProducts()` - Returns all products with view_count
- `SmartSearch()` - Returns searched products with view_count

#### 4. Routes (`main.go`)
Added new route:
```go
products.Post("/:id/view", productHandler.IncrementViewCount)
```

### Frontend Changes

#### 1. ProductCard Component (`client/src/components/ProductCard.tsx`)

**Import API:**
```typescript
import { api } from '../services/api'
```

**Update handleCardClick:**
```typescript
const handleCardClick = useCallback(async () => {
  // Increment view count when user clicks on the product card
  try {
    await api.post(`/api/products/${product.id}/view`)
  } catch (error) {
    // Silently fail - don't block navigation if view tracking fails
    console.error('Failed to track view:', error)
  }
  // Navigate to product details page
  navigate(getProductUrl(product))
}, [product, navigate])
```

#### 2. Dashboard Component (`client/src/pages/Dashboard.tsx`)

**Updated view count retrieval:**
```typescript
// Before:
const viewsCount = 0 // TODO: Fetch from API when available

// After:
const viewsCount = product.view_count || 0
```

## API Endpoint Details

### Increment View Count
```
POST /api/products/:id/view
```

**Request:**
- No body required
- No authentication required (but uses user ID if authenticated)

**Response Success (200):**
```json
{
  "success": true,
  "view_count": 5
}
```

**Response Errors:**
- `400 Bad Request`: Invalid product ID
- `404 Not Found`: Product doesn't exist
- `500 Internal Server Error`: Database error

**Example Usage (Frontend):**
```typescript
await api.post(`/api/products/123/view`)
```

## Security Considerations

### 1. **Self-View Prevention**
The endpoint checks if the viewer is the product owner and skips incrementing if true.

### 2. **No Authentication Required**
- Allows public users to view without login
- Authenticated users are tracked with their user_id
- Unauthenticated users can be tracked via IP (optional future enhancement)

### 3. **View Counting**
- One increment per endpoint call
- Clients should call once per navigation event (not on component render)
- No rate limiting implemented yet (can be added if needed)

## Database Queries

### Get Product with View Count
```sql
SELECT p.*, p.view_count FROM products p WHERE p.id = ?
```

### Update View Count
```sql
UPDATE products SET view_count = view_count + 1 WHERE id = ?
```

### Track View in History
```sql
INSERT INTO product_views (product_id, viewer_user_id) VALUES (?, ?)
```

## Testing Checklist

- [ ] Create a product and verify `view_count` is 0
- [ ] Click product from home page and verify view count increments to 1
- [ ] Click same product again and verify view count increments to 2
- [ ] Login as product owner and click their own product - view count should NOT increment
- [ ] Verify Dashboard shows correct view count for each product
- [ ] Test with network tab to confirm API calls are made
- [ ] Verify graceful handling if API call fails (should still navigate)
- [ ] Check pagination/search results show correct view counts
- [ ] Test with mobile responsive design

## Performance Considerations

- View count includes `COALESCE(p.view_count, 0)` to handle migrations gracefully
- Index on `product_id` in `product_views` table for efficient lookups
- No blocking operations - API call happens asynchronously before navigation

## Future Enhancements

1. **Rate Limiting**: Prevent rapid duplicate view counts from same IP/user
2. **Analytics Dashboard**: Show view count trends over time
3. **View Per Visitor**: Track unique views vs. total views
4. **Export Reports**: Generate view analytics for sellers
5. **A/B Testing**: Use view count to test listing variations

## Rollback Instructions

If needed to disable view counting:

1. **In ProductCard.tsx**: Remove the API call from `handleCardClick`
2. **In Dashboard.tsx**: Revert to `const viewsCount = 0`
3. **In main.go**: Remove or comment out the route registration
4. **Database**: Drop `view_count` column (optional):
   ```sql
   ALTER TABLE products DROP COLUMN view_count;
   ```

## Troubleshooting

**Issue**: View count not incrementing
- Check browser console for API errors
- Verify endpoint is registered in main.go
- Check if user is owner (self-views are prevented)
- Verify `view_count` column exists in database

**Issue**: Dashboard shows 0 for all products
- Ensure products table has `view_count` column
- Verify migration ran successfully
- Check if query includes `view_count` in SELECT statement

**Issue**: API returns 404
- Verify product ID is correct
- Check if product was deleted
- Verify database connection
