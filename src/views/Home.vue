<template>
  <div class="admin-container">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
      <div class="logo">
        <el-icon v-if="!isCollapsed" :size="24"><Management /></el-icon>
        <span v-if="!isCollapsed">管理系统</span>
      </div>
      
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapsed"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
        @select="handleMenuSelect"
      >
        <el-menu-item index="dashboard">
          <el-icon><Odometer /></el-icon>
          <template #title>工作台</template>
        </el-menu-item>
        
        <el-sub-menu index="user">
          <template #title>
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="user-list">用户列表</el-menu-item>
          <el-menu-item index="user-role">角色管理</el-menu-item>
        </el-sub-menu>
        
        <el-sub-menu index="product">
          <template #title>
            <el-icon><Goods /></el-icon>
            <span>商品管理</span>
          </template>
          <el-menu-item index="product-list">商品列表</el-menu-item>
          <el-menu-item index="product-category">分类管理</el-menu-item>
        </el-sub-menu>
        
        <el-menu-item index="order">
          <el-icon><ShoppingCart /></el-icon>
          <template #title>订单管理</template>
        </el-menu-item>
        
        <el-menu-item index="statistics">
          <el-icon><TrendCharts /></el-icon>
          <template #title>数据统计</template>
        </el-menu-item>
        
        <el-menu-item index="settings">
          <el-icon><Setting /></el-icon>
          <template #title>系统设置</template>
        </el-menu-item>
      </el-menu>
    </aside>

    <!-- 主内容区 -->
    <div class="main-wrapper">
      <!-- 顶部导航栏 -->
      <header class="top-header">
        <div class="header-left">
          <el-button 
            :icon="isCollapsed ? Expand : Fold" 
            circle 
            @click="toggleSidebar"
          />
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>工作台</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        
        <div class="header-right">
          <el-badge :value="3" class="notification-badge">
            <el-button :icon="Bell" circle />
          </el-badge>
          
          <el-dropdown @command="handleCommand">
            <div class="user-info">
              <el-avatar :size="32" src="https://cube.elemecdn.com/0f2530879c7682f5e8b529aeb46ef16d167ad823.png" />
              <span class="username">管理员</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="settings">账号设置</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <!-- 内容区域 -->
      <main class="content-area">
        <!-- 统计卡片 -->
        <el-row :gutter="20" class="stats-row">
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="hover" class="stat-card">
              <div class="stat-content">
                <div class="stat-icon user-icon">
                  <el-icon :size="32"><User /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-value">12,345</div>
                  <div class="stat-label">总用户数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="hover" class="stat-card">
              <div class="stat-content">
                <div class="stat-icon order-icon">
                  <el-icon :size="32"><ShoppingCart /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-value">8,234</div>
                  <div class="stat-label">订单总数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="hover" class="stat-card">
              <div class="stat-content">
                <div class="stat-icon revenue-icon">
                  <el-icon :size="32"><Money /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-value">¥128,456</div>
                  <div class="stat-label">总收入</div>
                </div>
              </div>
            </el-card>
          </el-col>
          
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card shadow="hover" class="stat-card">
              <div class="stat-content">
                <div class="stat-icon product-icon">
                  <el-icon :size="32"><Goods /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-value">1,234</div>
                  <div class="stat-label">商品数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 数据表格 -->
        <el-card class="table-card">
          <template #header>
            <div class="card-header">
              <span>最近订单</span>
              <el-button type="primary" size="small" :icon="Refresh" @click="refreshData">刷新</el-button>
            </div>
          </template>
          
          <!-- 搜索栏 -->
          <div class="search-bar">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索订单号/用户名"
              style="width: 300px"
              clearable
              :prefix-icon="Search"
            />
            <el-select v-model="statusFilter" placeholder="订单状态" style="width: 150px; margin-left: 10px;">
              <el-option label="全部" value="" />
              <el-option label="待支付" value="pending" />
              <el-option label="已完成" value="completed" />
              <el-option label="已取消" value="cancelled" />
            </el-select>
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="margin-left: 10px;"
            />
            <el-button type="primary" :icon="Search" style="margin-left: 10px;">搜索</el-button>
          </div>
          
          <!-- 表格 -->
          <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="orderId" label="订单号" width="180" />
            <el-table-column prop="userName" label="用户名" width="120" />
            <el-table-column prop="productName" label="商品名称" min-width="200" />
            <el-table-column prop="amount" label="金额" width="120">
              <template #default="{ row }">
                <span class="amount">¥{{ row.amount }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)">
                  {{ getStatusText(row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180" />
            <el-table-column label="操作" width="180" fixed="right">
              <template #default="{ row }">
                <el-button type="primary" size="small" link @click="handleView(row)">查看</el-button>
                <el-button type="primary" size="small" link @click="handleEdit(row)">编辑</el-button>
                <el-button type="danger" size="small" link @click="handleDelete(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-card>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  Management, Odometer, User, Goods, ShoppingCart,
  TrendCharts, Setting, Bell, Refresh, Search,
  Money, Fold, Expand
} from '@element-plus/icons-vue';

// 侧边栏折叠状态
const isCollapsed = ref(false);
const activeMenu = ref('dashboard');

// 切换侧边栏
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

// 菜单选择
const handleMenuSelect = (index) => {
  activeMenu.value = index;
  ElMessage.info(`选择了: ${index}`);
};

// 用户下拉菜单
const handleCommand = (command) => {
  if (command === 'logout') {
    ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      ElMessage.success('已退出登录');
    });
  } else {
    ElMessage.info(`点击了: ${command}`);
  }
};

// 搜索相关
const searchKeyword = ref('');
const statusFilter = ref('');
const dateRange = ref([]);

// 表格数据
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(100);

const tableData = ref([
  {
    orderId: 'ORD202606100001',
    userName: '张三',
    productName: 'iPhone 15 Pro Max 256GB',
    amount: '9999.00',
    status: 'completed',
    createTime: '2026-06-10 14:30:25'
  },
  {
    orderId: 'ORD202606100002',
    userName: '李四',
    productName: 'MacBook Pro 14英寸 M3芯片',
    amount: '14999.00',
    status: 'pending',
    createTime: '2026-06-10 13:20:15'
  },
  {
    orderId: 'ORD202606100003',
    userName: '王五',
    productName: 'AirPods Pro 第二代',
    amount: '1899.00',
    status: 'completed',
    createTime: '2026-06-10 12:15:30'
  },
  {
    orderId: 'ORD202606100004',
    userName: '赵六',
    productName: 'iPad Air 11英寸',
    amount: '4799.00',
    status: 'cancelled',
    createTime: '2026-06-10 11:05:45'
  },
  {
    orderId: 'ORD202606100005',
    userName: '孙七',
    productName: 'Apple Watch Ultra 2',
    amount: '6499.00',
    status: 'pending',
    createTime: '2026-06-10 10:30:20'
  }
]);

// 获取状态类型
const getStatusType = (status) => {
  const types = {
    pending: 'warning',
    completed: 'success',
    cancelled: 'info'
  };
  return types[status] || '';
};

// 获取状态文本
const getStatusText = (status) => {
  const texts = {
    pending: '待支付',
    completed: '已完成',
    cancelled: '已取消'
  };
  return texts[status] || status;
};

// 刷新数据
const refreshData = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    ElMessage.success('数据已刷新');
  }, 1000);
};

// 查看
const handleView = (row) => {
  ElMessage.info(`查看订单: ${row.orderId}`);
};

// 编辑
const handleEdit = (row) => {
  ElMessage.info(`编辑订单: ${row.orderId}`);
};

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(`确定要删除订单 ${row.orderId} 吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功');
  });
};

// 分页大小变化
const handleSizeChange = (val) => {
  pageSize.value = val;
  ElMessage.info(`每页显示: ${val} 条`);
};

// 页码变化
const handleCurrentChange = (val) => {
  currentPage.value = val;
  ElMessage.info(`当前页: ${val}`);
};
</script>

<style scoped>
.admin-container {
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
}

/* 侧边栏样式 */
.sidebar {
  width: 210px;
  background-color: #304156;
  transition: width 0.3s;
  overflow-x: hidden;
  flex-shrink: 0;
}

.sidebar-collapsed {
  width: 64px;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #1f2d3d;
  gap: 10px;
}

/* 主内容区 */
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 顶部导航栏 */
.top-header {
  height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.notification-badge {
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.username {
  color: #606266;
}

/* 内容区域 */
.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* 统计卡片 */
.stats-row {
  margin-bottom: 20px;
}

.stat-card {
  margin-bottom: 20px;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.user-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.order-icon {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.revenue-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.product-icon {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

/* 表格卡片 */
.table-card {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.amount {
  color: #f56c6c;
  font-weight: bold;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -210px;
    top: 0;
    bottom: 0;
    z-index: 1000;
  }
  
  .sidebar:not(.sidebar-collapsed) {
    left: 0;
  }
}
</style>
