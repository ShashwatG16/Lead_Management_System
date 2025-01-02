package com.example.Udaan.Udaan.Controller;

import com.example.Udaan.Udaan.Enitty.PendingTaskDTO;
import com.example.Udaan.Udaan.Enitty.PerformanceDTO;
import com.example.Udaan.Udaan.Services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    /**
     * API to get the overview of the Lead Management System.
     *
     * @return ResponseEntity containing total restaurants, total leads, and conversion rate.
     */
    @GetMapping("/overview")
    public ResponseEntity<Map<String, Object>> getOverview() {
        Map<String, Object> overview = dashboardService.getOverview();
        return ResponseEntity.ok(overview);
    }

    /**
     * API to get the pending tasks for the admin.
     *
     * @return ResponseEntity containing a list of pending tasks.
     */
    @GetMapping("/pending-tasks")
    public ResponseEntity<List<PendingTaskDTO>> getPendingTasks() {
        System.out.println("pending tasks");
        List<PendingTaskDTO> pendingTasks = dashboardService.getPendingTasks();
        return ResponseEntity.ok(pendingTasks);
    }

    /**
     * API to get the top-performing restaurants.
     *
     * @return ResponseEntity containing a list of top performers with performance scores.
     */
    @GetMapping("/top-performers")
    public ResponseEntity<List<PerformanceDTO>> getTopPerformers() {
        List<PerformanceDTO> topPerformers = dashboardService.getTopPerformers();
        return ResponseEntity.ok(topPerformers);
    }
}
