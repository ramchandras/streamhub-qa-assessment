
-- Sample schema: SQL Server
CREATE TABLE Transactions (
    TransactionId INT PRIMARY KEY,
    FromAccount VARCHAR(20),
    ToAccount VARCHAR(20),
    Amount DECIMAL(12, 2),
    TransactionDate DATETIME2
);

INSERT INTO Transactions VALUES
(1, 'A', 'B', 1000.00, '2024-04-01 10:00:00'),
(2, 'B', 'A', 950.00,  '2024-04-02 09:00:00'),
(3, 'C', 'D', 500.00,  '2024-04-01 12:00:00'),
(4, 'D', 'C', 800.00,  '2024-04-03 12:00:00'),
(5, 'A', 'B', 2000.00, '2024-04-05 10:00:00'),
(6, 'B', 'A', 2200.00, '2024-04-06 11:00:00');

SELECT
    t1.TransactionId AS OutgoingTransactionId,
    t2.TransactionId AS ReturnTransactionId,
    t1.FromAccount,
    t1.ToAccount,
    t1.Amount AS OutgoingAmount,
    t2.Amount AS ReturnAmount,
    t1.TransactionDate AS OutgoingDate,
    t2.TransactionDate AS ReturnDate
FROM Transactions t1
JOIN Transactions t2
    ON t1.FromAccount = t2.ToAccount
   AND t1.ToAccount = t2.FromAccount
   AND t1.TransactionId <> t2.TransactionId
   AND t2.TransactionDate >= t1.TransactionDate
   AND t2.TransactionDate <= DATEADD(HOUR, 24, t1.TransactionDate)
   AND t2.Amount BETWEEN t1.Amount * 0.9 AND t1.Amount * 1.1
ORDER BY t1.TransactionId;

DROP TABLE Transactions;
