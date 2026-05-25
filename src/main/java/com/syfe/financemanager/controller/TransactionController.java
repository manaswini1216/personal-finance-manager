package com.syfe.financemanager.controller;

import com.syfe.financemanager.dto.TransactionRequest;
import com.syfe.financemanager.entity.Transaction;
import com.syfe.financemanager.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.syfe.financemanager.dto.ReportResponse;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/{userId}")
    public Transaction createTransaction(
            @PathVariable Long userId,
            @RequestBody TransactionRequest request) {

        return transactionService.createTransaction(
                userId,
                request
        );
    }

    @GetMapping("/{userId}")
    public List<Transaction> getTransactions(
            @PathVariable Long userId) {

        return transactionService.getUserTransactions(userId);
    }
    @PutMapping("/{transactionId}")
    public Transaction updateTransaction(
            @PathVariable Long transactionId,
            @RequestBody TransactionRequest request) {

        return transactionService.updateTransaction(
                transactionId,
                request
        );
    }

    @DeleteMapping("/{transactionId}")
    public String deleteTransaction(
            @PathVariable Long transactionId) {

        return transactionService.deleteTransaction(
                transactionId
        );
    }
    @GetMapping("/summary/{userId}")
    public ReportResponse getSummary(
            @PathVariable Long userId) {

        return transactionService.getSummary(userId);
    }
}