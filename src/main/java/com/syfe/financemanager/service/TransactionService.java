package com.syfe.financemanager.service;

import com.syfe.financemanager.dto.TransactionRequest;
import com.syfe.financemanager.entity.Transaction;
import com.syfe.financemanager.entity.User;
import com.syfe.financemanager.repository.TransactionRepository;
import com.syfe.financemanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.syfe.financemanager.dto.ReportResponse;
import com.syfe.financemanager.entity.TransactionType;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    public Transaction createTransaction(
            Long userId,
            TransactionRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Transaction transaction = new Transaction();

        transaction.setTitle(request.getTitle());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setCategory(request.getCategory());
        transaction.setTransactionDate(
                request.getTransactionDate());

        transaction.setUser(user);

        return transactionRepository.save(transaction);
    }

    public List<Transaction> getUserTransactions(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return transactionRepository.findByUser(user);
    }
    public Transaction updateTransaction(
            Long transactionId,
            TransactionRequest request) {

        Transaction transaction =
                transactionRepository.findById(transactionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Transaction not found"));

        transaction.setTitle(request.getTitle());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setCategory(request.getCategory());
        transaction.setTransactionDate(
                request.getTransactionDate());

        return transactionRepository.save(transaction);
    }

    public String deleteTransaction(Long transactionId) {

        Transaction transaction =
                transactionRepository.findById(transactionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Transaction not found"));

        transactionRepository.delete(transaction);

        return "Transaction deleted successfully";
    }
    public ReportResponse getSummary(Long userId) {

        Double income =
                transactionRepository.getTotalByType(
                        userId,
                        TransactionType.INCOME
                );

        Double expense =
                transactionRepository.getTotalByType(
                        userId,
                        TransactionType.EXPENSE
                );

        Double balance = income - expense;

        return new ReportResponse(
                income,
                expense,
                balance
        );
    }
}