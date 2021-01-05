-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT p.ProductName, c.CategoryName FROM [Product] AS p
    JOIN Category AS c ON p.CategoryId = c.Id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT o.id as OrderID, s.CompanyName FROM [Order] AS o
    JOIN [Shipper] AS s ON o.ShipVia = s.Id
    WHERE o.OrderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT o.id as OrderID, p.ProductName, o.quantity FROM [OrderDetail] as o
    JOIN [Product] AS p ON o.ProductId = p.id
    WHERE OrderId = 10251
    ORDER BY p.ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT o.id AS OrderID, c.id AS CustomerCompanyName, e.LastName AS EmployeeLastName FROM [ORDER] AS o
    JOIN [Employee] AS e ON o.EmployeeId = e.id
    JOIN [Customer] AS c ON o.CustomerId = c.Id;