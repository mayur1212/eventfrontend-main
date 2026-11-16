# Backend implementation prompt: Kits Buy

Implement a robotics kit shop in the existing backend. Preserve the current auth, events and registration APIs. The React frontend already uses the contracts below through its existing Axios instance (base URL ends in `/api`, bearer token from localStorage). Use the backend's existing framework/database conventions. Do not require frontend edits to the API response shapes below.

## Models and validation

Product: `id` (serialize database ID as string), `name`, `category` (Motion | Electronics | Structure), `description`, `use` (Marathi allowed), `imageUrl` (optional HTTP(S) URL), `features` (string array), `kind` (motor | servo | wheel | gear | hub | sensor), `color` (blue | purple | orange | teal | pink), `pricePaise` (positive safe integer), `stock` (nonnegative integer), `active` (boolean), timestamps, `archivedAt`. Reject invalid fields, bounds, negative/fractional stock, unsafe monetary values and unsupported image protocols. Whitelist mutation fields. Cap lengths and quantity (1–10).

ShopOrder: opaque unguessable `id`, product reference plus immutable product/name/price snapshot, quantity, customer delivery details, server-calculated subtotal/tax/shipping/amount in paise, INR currency, Razorpay order and payment IDs, status (pending | paid | failed | cancelled | refunded), timestamps, idempotency key and payload hash, stock reservation and expiry. Customer: `name`, `email`, `phone` (10 digit Indian mobile), `address`, `city`, `state`, `postalCode` (6 digit Indian PIN). Trim/validate all fields. Configure real tax/shipping rules on the server; do not silently invent rates.

## API contract (paths relative to /api)

- `GET /products` public: return a JSON array of active, unarchived product objects. An empty array means an empty catalogue. Include stock and pricePaise. Public read only; do not disclose supplier or private fields.
- `GET /admin/products` admin: JSON array including hidden products.
- `POST /admin/products` admin: accept product fields; return created product, HTTP 201.
- `PUT /admin/products/:id` admin: update whitelisted product fields; return updated product.
- `DELETE /admin/products/:id` admin: soft archive/unpublish. Preserve all historical order data. HTTP 204.
- `POST /shop/orders` public guest checkout, with rate limits: body `{ productId, quantity, customer }`; header `Idempotency-Key` UUID. Never accept client price, total, status, key ID, or payment ID. Read current product, enforce published status and stock, calculate final payable amount server-side, reserve stock atomically, persist pending order, create Razorpay order via server SDK. Return `{ id, razorpayOrderId, keyId, amount, currency: "INR" }`. `keyId` is the public Razorpay key ID, never the secret. For the same idempotency key and same payload return the existing order, including after a network retry; conflicting payload returns 409. Do not create multiple Razorpay orders on a concurrent/retried request. Handle gateway failure and crash recovery, retaining enough state for reconciliation. An existing paid order must not be payable again. Release expired reservations with a scheduled job and cancel/expire unpaid attempts safely.
- `POST /shop/orders/:id/verify` body `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }`: load the original stored Razorpay order ID; reject mismatches. Compute and timing-safely compare HMAC-SHA256 of stored order ID + `|` + payment ID with server-only key secret. Fetch payment/order server-to-server; verify matching order, amount, currency and captured payment. Only mark paid on confirmed capture. Commit stock exactly once. Return `{ id, status: "paid", paymentId, amount, currency: "INR" }` for confirmed payment. Return `{ id, status: "pending" }` if capture remains pending; never report success merely because the browser handler ran. Verification retries must be idempotent. Invalid proofs return a non-2xx error with a safe message. Rate-limit and do not disclose customer details to guest callers.
- `GET /admin/shop/orders` admin: JSON array (newest first), each `{ id, productName, quantity, customer: { name, email, phone, address, city, state, postalCode }, amount, currency: "INR", status, paymentId, createdAt }`. Add bounded query pagination as a subsequent coordinated frontend change; do not silently return only the first page as a complete history.
- `POST /shop/webhooks/razorpay`: verify Razorpay webhook signature with separate webhook secret against the raw body (before JSON parsing). Process payment.captured, payment.failed and order.paid. Deduplicate event IDs, handle out-of-order delivery and retries, verify expected amount/order association. A failed attempt must not downgrade a paid order. Reconcile missed browser callbacks, prevent duplicate stock decrement, and handle late captured payments after reservation expiry without overselling (flag for resolution/refund if necessary). Include refund reconciliation.

## Authentication and security

Reuse existing JWT verification and require server-side admin role on every /admin mutation/read. A frontend route guard is not authorization. Guest checkout is supported; do not assume a login. Use unguessable order IDs and validate payment proof before returning order payment data. No public endpoint for customers' shipping details. Restrict CORS to configured frontend origins. Return errors as `{ message: "Useful safe message" }`. Redact auth/payment credentials and customer PII from logs. Store secrets only in backend environment: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET. Start with test credentials. Use HTTPS in production. Never store card details.

## Seed and rollout

Provide an explicit optional seed command for these six products, using the descriptions/use/features from `src/data/products.js`: DC Motors, Servo Motors, Wheels, Gears & Shafts, Control Hub, Sensors. Get actual prices/stock from the owner; do not invent live prices. Keep unpriced products unpublished. Do not seed or overwrite products on normal server startup.

Once endpoints and real prices/stock are configured, set `REACT_APP_SHOP_API_ENABLED=true` in the frontend environment and restart/rebuild the frontend. Keep `REACT_APP_API_BASE_URL` pointed at the backend /api. Until then the original six-product static catalogue remains available and payment is disabled. The frontend's Products/Kit Orders admin tabs are API clients, not browser-local storage.

## Verification

Test admin vs regular/anonymous authorization; CRUD/publish/archive and public catalogue updates; invalid input and price tampering; sold-out and competing buyers; idempotent duplicate order creation; failed/cancelled checkout; signature mismatch; correct signature but wrong amount/order/uncaptured status; duplicate verification; webhook deduplication and ordering; reservation expiry; late capture; network retry; verified paid order totals; and guest PII protection. Run a real Razorpay test-mode payment end to end with webhook delivery before enabling live payments.

Official reference: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/

The pre-existing `/payment` event-registration page is a separate integration. This shop does not reuse its placeholder key or event payment flow.

## Checkout availability update

The checkout now uses the fetched product's positive `pricePaise` and valid stock/quantity to enable payment; it does not rely on the frontend feature flag. Prices appear in the checkout order summary. Public UI displays availability messages without displaying inventory counts; exact stock remains visible in the admin dashboard. The existing API contract still returns stock to allow quantity checks, so this is presentation-level hiding, not confidential inventory storage. Enforce the quantity/stock limit again on the server, including concurrent orders. Return 409 with `{ "message": "Not available — the requested quantity is currently unavailable. Please reduce the quantity." }` when stock is insufficient; do not include inventory counts in customer-facing errors. The existing maximum of 10 units per order still applies. A zero/missing price must prevent payment instead of allowing a zero-value order.
