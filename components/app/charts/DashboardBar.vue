<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = {
    labels: ['Premium', 'Medium', 'Regular', 'Wangi'],
    datasets: [
        {
            label: 'Maret',
            backgroundColor: '#8b5cf6', // purple
            data: [84, 58, 68, 45]
        },
        {
            label: 'April',
            backgroundColor: '#ef4444', // red
            data: [41, 38, 42, 42]
        },
        {
            label: 'Mei',
            backgroundColor: '#3b82f6', // blue
            data: [41, 71, 42, 42]
        }
    ]
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 100,
        }
    }
};
</script>