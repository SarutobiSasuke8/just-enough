# SQL

A question you can check.

SQL asks a table a question. A model will write the query from English. You still need to know what a group and a null are, or you will trust a confident wrong count.

About 15 minutes.

## If you only remember one thing

WHERE chooses rows. GROUP BY collapses them to one row per group. NULL is not equal to anything, including NULL.

## You can already ask for

1. **How many per customer, last month.** The report you used to build by sorting a spreadsheet.
2. **Which rows are duplicates.** Group, count, keep the groups whose count is more than one.
3. **Two exports, matched on one id.** A join. You name the key. The model writes the rest. You check the row count.
4. **A query you can say back in one sentence.** If you cannot say what one result row means, do not send the number onward.

## Know these

### 1. SELECT, FROM, WHERE

SELECT names the columns you want back. FROM names the table. WHERE throws away rows before any totaling. Start every review there: which rows are even allowed in?

```sql
SELECT email, created_at
FROM users
WHERE created_at >= DATE '2026-01-01';
```

### 2. GROUP BY is one row per

If you asked for one row per customer and got one row per order, the collapse never happened. COUNT(*) after a proper GROUP BY counts the group, not the whole table.

```sql
SELECT customer_id, COUNT(*) AS orders
FROM orders
WHERE status = 'paid'
GROUP BY customer_id;
```

### 3. JOIN matches rows

A join lines up two tables on a key you name. If the key is wrong, rows duplicate and counts inflate. Compare the count to what you expect before you believe a sum.

### 4. NULL is its own thing

NULL means unknown, not zero and not an empty string. Nothing equals NULL, not even NULL. Write IS NULL or IS NOT NULL. Models get this wrong constantly.

```sql
SELECT COUNT(*) AS waiting
FROM orders
WHERE refunded_at IS NULL;
```

### 5. Look before you change

Have the model write SELECT first. UPDATE and DELETE without a WHERE can empty a table. If a change is required, ask for the SELECT that shows the rows it will touch, and run that yourself.

## Leave these

They are real. They are not first. Come back when a task forces them.

- Window functions, until a question forces them
- Stored procedures
- The query planner
- An ORM
- Dialect trivia you do not use

## A prompt that works

Replace the brackets. Leave the constraints.

```text
Schema:
[table names and columns]

Question, in one sentence: [question]

Write one SELECT. Name the output columns in plain words.
Do not use UPDATE, DELETE, or INSERT.
If you mention NULL, use IS NULL or IS NOT NULL, never = NULL.
After the query, explain it in three lines: which rows survive, how they group, and what one result row means.
```

## Read this

Don’t write it. Decide what it does.

```sql
SELECT COUNT(*) AS n
FROM orders
WHERE refunded_at = NULL;
```

### 1. Ten of forty orders have no refund, so refunded_at is null on those rows. What does this return?

- 0. Nothing equals NULL. The test should be IS NULL
- 10
- 40

<details><summary>Answer</summary>

0. Nothing equals NULL. The test should be IS NULL

The query is legal and the answer is confidently wrong. This is the bug to memorize. Equality does not match NULL.

</details>

### 2. You asked for one row per customer, paid orders only, and received one row per order. What is missing?

- GROUP BY customer_id, after WHERE status = 'paid'
- A second copy of SELECT
- ORDER BY, which performs the grouping

<details><summary>Answer</summary>

GROUP BY customer_id, after WHERE status = 'paid'

WHERE keeps the paid orders. GROUP BY collapses them. ORDER BY only sorts. If the count matches the raw table, nothing was collapsed.

</details>
