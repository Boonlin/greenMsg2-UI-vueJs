import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import ShipmentDetail from './components/page/ShipmentDetail.vue'
import ReceiptDetail from './components/page/ReceiptDetail.vue'
import GroupStatus from './components/page/GroupStatus.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { redirect:'/shipmentDetail'},
        { path: '/shipmentDetail', component: ShipmentDetail },
        { path: '/receiptDetail', component: ReceiptDetail },
        { path: '/groupStatus', component: GroupStatus},
    ]
});


const app = createApp(App)
app.use(router);
app.mount('#app')
                  