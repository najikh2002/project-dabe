<template>
    <Doughnut :data="chartData" :options="chartOptions" :plugins="plugins" />
</template>

<script setup>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const chartData = {
    labels: ['Premium', 'Dele', 'Wangi', 'Medium'],
    datasets: [
        {
            backgroundColor: ['#8b5cf6', '#ef4444', '#3b82f6', '#2dd4bf'], // purple, red, blue, teal
            data: [156, 161, 147, 185],
        },
    ],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
        legend: {
            position: 'right',
        },
    },
};

const centerTextPlugin = {
    id: 'centerText',
    afterDraw: (chart) => {
        if (chart.data.datasets.length === 0 || chart.data.datasets[0].data.length === 0) {
            return; // Tidak ada data untuk ditampilkan
        }

        const ctx = chart.ctx;
        const { width: canvasWidth, height: canvasHeight } = chart.canvas; // Gunakan dimensi canvas
        const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);

        ctx.restore();

        let finalFontSize;
        let textX, textY;

        const arcs = chart.getDatasetMeta(0).data;
        if (arcs.length > 0 && arcs[0].innerRadius !== undefined && typeof arcs[0].x === 'number' && typeof arcs[0].y === 'number') {
            // Hitung ukuran font berdasarkan innerRadius, pastikan minimal 10px
            finalFontSize = Math.max(10, Math.floor(arcs[0].innerRadius * 0.35));
            textX = arcs[0].x; // Gunakan pusat X dari doughnut
            textY = arcs[0].y; // Gunakan pusat Y dari doughnut
        } else {
            // Fallback jika data arc tidak tersedia (misalnya chart belum sepenuhnya render)
            finalFontSize = Math.max(10, Math.floor(Math.min(canvasWidth, canvasHeight) / 15)); // Ukuran fallback
            textX = canvasWidth / 2; // Pusat X canvas
            textY = canvasHeight / 2; // Pusat Y canvas
        }
        ctx.font = `bold ${finalFontSize}px sans-serif`; // Gunakan ukuran font dalam piksel
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';   // Pastikan teks diratakan tengah secara horizontal
        ctx.fillStyle = '#1f2937'; // gray-800
        const text = total.toString();
        ctx.fillText(text, textX, textY);
        ctx.save();
    },
};

const plugins = [centerTextPlugin];
</script>