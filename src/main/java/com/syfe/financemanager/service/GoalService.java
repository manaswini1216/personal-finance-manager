package com.syfe.financemanager.service;

import com.syfe.financemanager.dto.GoalRequest;
import com.syfe.financemanager.entity.Goal;
import com.syfe.financemanager.entity.User;
import com.syfe.financemanager.repository.GoalRepository;
import com.syfe.financemanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private UserRepository userRepository;

    public Goal createGoal(
            Long userId,
            GoalRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Goal goal = new Goal();

        goal.setGoalName(request.getGoalName());
        goal.setTargetAmount(request.getTargetAmount());
        goal.setSavedAmount(request.getSavedAmount());

        goal.setUser(user);

        return goalRepository.save(goal);
    }

    public List<Goal> getGoals(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return goalRepository.findByUser(user);
    }

    public Goal updateGoal(
            Long goalId,
            GoalRequest request) {

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() ->
                        new RuntimeException("Goal not found"));

        goal.setGoalName(request.getGoalName());
        goal.setTargetAmount(request.getTargetAmount());
        goal.setSavedAmount(request.getSavedAmount());

        return goalRepository.save(goal);
    }

    public String deleteGoal(Long goalId) {

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() ->
                        new RuntimeException("Goal not found"));

        goalRepository.delete(goal);

        return "Goal deleted successfully";
    }
}
