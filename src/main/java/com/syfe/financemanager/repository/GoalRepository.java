package com.syfe.financemanager.repository;

import com.syfe.financemanager.entity.Goal;
import com.syfe.financemanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoalRepository
        extends JpaRepository<Goal, Long> {

    List<Goal> findByUser(User user);
}