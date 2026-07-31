package com.syfe.financemanager.controller;

import com.syfe.financemanager.dto.GoalRequest;
import com.syfe.financemanager.entity.Goal;
import com.syfe.financemanager.service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @PostMapping("/{userId}")
    public Goal createGoal(
            @PathVariable Long userId,
            @RequestBody GoalRequest request) {

        return goalService.createGoal(userId, request);
    }

    @GetMapping("/{userId}")
    public List<Goal> getGoals(
            @PathVariable Long userId) {

        return goalService.getGoals(userId);
    }

    @PutMapping("/{goalId}")
    public Goal updateGoal(
            @PathVariable Long goalId,
            @RequestBody GoalRequest request) {

        return goalService.updateGoal(goalId, request);
    }

    @DeleteMapping("/{goalId}")
    public String deleteGoal(
            @PathVariable Long goalId) {

        return goalService.deleteGoal(goalId);
    }
}
