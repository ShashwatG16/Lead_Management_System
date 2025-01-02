package com.example.Udaan.Udaan.Services;

import com.example.Udaan.Udaan.Enitty.PendingTaskDTO;
import com.example.Udaan.Udaan.Enitty.PerformanceDTO;
import com.example.Udaan.Udaan.Enitty.PendingTaskDTO;

import java.util.List;
import java.util.Map;

public interface DashboardService {

    Map<String, Object> getOverview();

    List<PendingTaskDTO> getPendingTasks();

    List<PerformanceDTO> getTopPerformers();
}

