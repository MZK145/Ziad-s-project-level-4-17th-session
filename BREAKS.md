# BREAKS.md

Apply each break one at a time. Run npm test after each one.
Write a test that catches it if the suite does not. Then revert before moving to the next.

---

## Break 1 — Remove the null check in deleteProduct

In services/productService.js, find this block inside deleteProduct:

  if (!result) throw new Error("Product not found");

Delete that line. Save and run npm test.
If no test fails, write one that catches this missing guard. Revert when done.

---

## Break 2 — Make createProduct return undefined

In services/productService.js, change deleteProduct to:

  await Product.create(data);
  // return nothing

Remove the return statement so the function returns undefined instead of the saved product.
Run npm test. If no test fails, write one asserting the result is not undefined. Revert when done.

---

## Break 3 — Silently cut getAllProducts results

In services/productService.js, change getAllProducts to:

  const products = await Product.find().limit(1);

Run npm test. If no test fails, add an assertion checking the correct array length is returned. Revert when done.

---

## Break 4 — Swallow errors in createProduct

In services/productService.js, wrap the create call in a try/catch that does nothing:

  try {
    const product = await Product.create(data);
    return product;
  } catch (err) {
    // silently swallow the error
  }

Run npm test. Write a test using mockRejectedValue that proves the error is swallowed instead of thrown. Revert when done.
