import {useState, useEffect }from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  AreaChart, 
  Area, 
  Cell
} from 'recharts';
import { 
  Person, 
  Restaurant, 
  TrendingUp, 
  TrendingDown,
  Report
} from '@mui/icons-material';
import { 
  Box, 
  Typography, 
  Divider
} from '@mui/material';
import {
  readStats, 
  graphicLine,
  graphicBar,
  graphicArea,
  graphicPie
} from "../api/api.js"
import toast from "react-hot-toast";

import FavoriteIcon from '@mui/icons-material/Favorite'

const FoodMatchDashboard = ({setIsLoading}) => {
  const [stats, setStats] = useState(null);
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", 
      "Junio", "Julio", "Agosto", "Septiembre", 
      "Octubre", "Noviembre", "Diciembre"
  ];


  //ESTILOS CSS
  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };
  
  const cardHeaderStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  };
  
  const cardContentStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '5px',
  };
  
  const cardFooterStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  //CONFIGURACIÓN DE LAS ESTADÍSTICAS DE LAS CARTAS
  const IconWrapper = ({ color, children }) => (
    <div style={{ backgroundColor: color, padding: '8px', borderRadius: '50%', marginRight: '10px', display: "flex", alignItems: "center" }}>
      {children}
    </div>
  );
  
  const StatCard = ({ title, value, change, Icon, color }) => {
    const isPositive = change > 0;
    return (
      <div style={cardStyle}>
        <div style={cardHeaderStyle}>{title}</div>
        <div style={cardContentStyle}>{value.toLocaleString()}</div>
        <div style={cardFooterStyle}>
          <IconWrapper color={color}>
            <Icon style={{ color: 'white' }} />
          </IconWrapper>
          <span style={{ color: isPositive ? 'green' : 'red', display: 'flex', alignItems: 'center' }}>
            {isPositive ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
            {Math.abs(change)}% respecto al mes pasado
          </span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    //ESTADISTICAS EN CARTAS
    const loadStats = async () => {
      setIsLoading(true);
      try {
        const response = await readStats()
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error("No se pudieron cargar las estadísticas.", {
          position: "bottom-center",
          duration: 4000,
          style: {
            fontFamily: "Segoe UI",
            background: "#101010",
            color: "#fff",
          },
        });
      } finally{
        setIsLoading(false);
      }
    };
    loadStats();

    //GRAFICO DE LINEA
    const loadLineGraphic = async () => {
      try{
        const response = await graphicLine()
        const userGrowth = response.data.userGrowth
        const restaurantGrowth = response.data.restaurantGrowth
        const formattedData = Array.from({ length: 12 }, (_, i) => ({
          month: monthNames[i],
          usuarios: userGrowth.find((u) => u._id === i + 1)?.count || 0,
          restaurantes: restaurantGrowth.find((r) => r._id === i + 1)?.count || 0,
        }));
        setLineData(formattedData);
      } catch(error){
        console.error('Error fetching line graphic:', error);
        toast.error("No se cargar el gráfico de linea.", {
          position: "bottom-center",
          duration: 4000,
          style: {
            fontFamily: "Segoe UI",
            background: "#101010",
            color: "#fff",
          },
        });
      }
      
    };
    loadLineGraphic();

    //GRAFICO DE BARRAS
    const lineData = async () => {
      try{
        const data = await graphicBar();
        const formattedData = data.data.map((item) => ({
          name: item._id,
          count: item.count,
        }));

        setBarData(formattedData);
      } catch(error){
        console.error('Error fetching bar graphic:', error);
        toast.error("No se cargar el gráfico de barras.", {
          position: "bottom-center",
          duration: 4000,
          style: {
            fontFamily: "Segoe UI",
            background: "#101010",
            color: "#fff",
          },
        });
      }
      
    };
    lineData();

    //GRAFICO DE AREA
    const AreaData = async () => {
      try{
        const data = await graphicArea();
        const formattedAreaData = data.data.map(item => ({
          ...item,
          month: monthNames[item.month - 1]
      }));
      
        setAreaData(formattedAreaData);
      } catch(error){
        console.error('Error fetching area graphic:', error);
        toast.error("No se cargar el gráfico de area.", {
          position: "bottom-center",
          duration: 4000,
          style: {
            fontFamily: "Segoe UI",
            background: "#101010",
            color: "#fff",
          },
        });
      }
      
    };
    AreaData();

    const PieData = async () => {
      try{
        const data = await graphicPie();
      
        setPieData(data.data);
      } catch(error){
        console.error('Error fetching pie graphic:', error);
        toast.error("No se cargar el gráfico de pastel.", {
          position: "bottom-center",
          duration: 4000,
          style: {
            fontFamily: "Segoe UI",
            background: "#101010",
            color: "#fff",
          },
        });
      }
      
    };
    PieData();
  }, [setIsLoading]);

  if (!stats) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h6">Cargando estadísticas...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', textAlign: 'center', mt: 3}}>
      <Box sx={{display: "flex",justifyContent: "space-between", flexDirection: {xs: "column", md: "row"} }}>
        <Box>
          <Typography 
          variant='h5' 
          sx={{ 
            marginBottom: '20px', 
            color: '#333', 
            textAlign: {xs:"center",md:"start"},
            fontWeight: "bold"
           }}
          > 
          FoodMatch Dashboard
          </Typography> 

          <Typography 
          sx={{ 
            marginBottom: '20px', 
            color: '#333', 
            textAlign: {xs:"center",md:"start"} }}
          > 
          Bienvenido al Dashboard, consulta tus datos y gráficos de forma fácil y rápida
          </Typography> 
        </Box>

      </Box>
      <Divider />
      <Box 
        sx={{ 
          display: 'grid', 
          gap: '20px', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          mt: 3
        }}
      >
        <StatCard 
          title="Usuarios Totales" 
          value={stats.totalUsers || 0} 
          change={stats.userChange || 0} 
          Icon={Person} 
          color="#4CAF50" 
        />
        <StatCard 
          title="Restaurantes Registrados" 
          value={stats.totalRestaurants || 0} 
          change={stats.restaurantChange || 0} 
          Icon={Restaurant} 
          color="#2196F3" 
        />
        <StatCard 
          title="Matchs Realizados" 
          value={stats.totalMatchs || 0} 
          change={stats.matchsChange || 0} 
          Icon={FavoriteIcon} 
          color="#E91E63" 
        />
        <StatCard 
          title="Incidencias Registradas este mes" 
          value={stats.totalIncidents || 0} 
          change={stats.incidentsChange || 0} 
          Icon={Report} 
          color="#ff9a11" 
        />
      </Box>

      <Box
        sx={{ 
          display: 'grid', 
          gap: '20px', 
          gridTemplateColumns: { xs: '1fr', md: '6fr 4fr' }, 
          gridTemplateRows: 'auto auto',
          marginTop: '20px'
        }}
      >
        <Box sx={{ ...cardStyle }}>
          <Box sx={cardHeaderStyle}>Crecimiento Mensual de Usuarios y Restaurantes</Box>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="usuarios" stroke="#4CAF50" />
              <Line type="monotone" dataKey="restaurantes" stroke="#2196F3" />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Box sx={{ ...cardStyle }}>
          <Box sx={cardHeaderStyle}>Top 5 Tipos de Restaurantes</Box>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Box
        sx={{ 
          display: 'grid', 
          gap: '20px', 
          gridTemplateColumns: { xs: '1fr', md: '7fr 3fr' }, 
          gridTemplateRows: 'auto auto',
          marginTop: '20px'
        }}
      >
        <Box sx={{ ...cardStyle }}>
          <Box sx={cardHeaderStyle}>Incidencias por Mes</Box>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#FF5722" fill="#FF8A65" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>


        <Box sx={{ ...cardStyle }}>
          <Box sx={cardHeaderStyle}>Distribución de Calificaciones de Restaurantes</Box>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default FoodMatchDashboard;