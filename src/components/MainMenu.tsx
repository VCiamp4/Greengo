import { Bell, Settings, ShoppingBag, QrCode, Trophy, Recycle, Award, Leaf, Medal, Flame, Shield, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { QRScanner } from './QRScanner';
import { ScanResult } from './ScanResult';
import { Ranking } from './Ranking';
import { Achievements } from './Achievements';
import { Store } from './Store';
import { Notifications } from './Notifications';
import { Settings as SettingsPanel } from './Settings';

interface MainMenuProps {
  userName: string;
  userEmail: string;
}

export function MainMenu({ userName, userEmail }: MainMenuProps) {
  const totalPoints = 1250;
  const userLevel = 5;
  const [showScanner, setShowScanner] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [scannedData, setScannedData] = useState('');

  // Datos de racha
  const streakDays = 5;
  const protectedStreaks = 1;
  const weekDays = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  const completedDays = [true, true, true, true, true, false, false]; // 5 días completados

  const handleScanSuccess = (data: string) => {
    setScannedData(data);
    setShowScanner(false);
    setShowResult(true);
  };

  const handleContinueAfterScan = () => {
    setShowResult(false);
    // Aquí podrías actualizar los puntos del usuario
  };

  const handleOpenSettings = () => {
    console.log('Abriendo configuración...');
    setShowSettings(true);
  };

  if (showScanner) {
    return (
      <QRScanner 
        onClose={() => setShowScanner(false)}
        onScanSuccess={handleScanSuccess}
      />
    );
  }

  if (showRanking) {
    return <Ranking userName={userName} onBack={() => setShowRanking(false)} />;
  }

  if (showAchievements) {
    return <Achievements userName={userName} onBack={() => setShowAchievements(false)} />;
  }

  if (showStore) {
    return <Store userName={userName} onBack={() => setShowStore(false)} />;
  }

  if (showSettings) {
    return <SettingsPanel userName={userName} userEmail={userEmail} onBack={() => setShowSettings(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-white pb-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 pt-12 pb-8 px-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          {/* Avatar/Perfil */}
          <button className="relative">
            <Avatar className="h-14 w-14 border-2 border-white shadow-lg">
              <AvatarFallback className="bg-green-700 text-white">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1 shadow-md">
              <Award className="w-4 h-4 text-yellow-900" />
            </div>
          </button>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <button 
              onClick={() => setShowNotifications(true)}
              className="relative bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all shadow-md"
            >
              <Bell className="w-6 h-6 text-white" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button 
              onClick={handleOpenSettings}
              className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all shadow-md"
            >
              <Settings className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Info del usuario */}
        <div className="text-white">
          <h2 className="mb-1">¡Hola, {userName}!</h2>
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
              <Leaf className="w-3 h-3 mr-1" />
              Nivel {userLevel}
            </Badge>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="px-6 -mt-8 pb-8">
        {/* Card de puntos */}
        <Card className="bg-white shadow-xl border-0 p-6 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mb-4 shadow-lg">
              <Recycle className="w-12 h-12 text-white animate-[spin_3s_linear_infinite]" />
            </div>
            <p className="text-gray-600 mb-2">Puntaje Total</p>
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-green-600">{totalPoints.toLocaleString()}</h1>
              <span className="text-green-600">pts</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Top 15% de recicladores</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Racha Timeline */}
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-0 shadow-xl mb-8 overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-200/30 rounded-full blur-2xl"></div>
          
          <div className="p-6 relative">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-to-br from-orange-400 to-red-500 p-2 rounded-xl shadow-lg">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-orange-900">{streakDays} días consecutivos</h3>
                    <p className="text-orange-600">¡Mantén el ritmo!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline de la semana mejorado */}
            <div className="mb-5">
              <div className="flex items-center justify-between">
                {weekDays.map((day, index) => {
                  const isToday = index === 4; // Jueves (índice 4) es el día actual
                  return (
                    <div key={index} className="flex flex-col items-center gap-2 relative">
                      <span className={`${
                        completedDays[index] ? 'text-green-700' : 'text-gray-500'
                      } transition-colors`}>
                        {day}
                      </span>
                      <div 
                        className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          completedDays[index]
                            ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg scale-110'
                            : 'bg-white border-2 border-dashed border-gray-300'
                        } ${isToday && completedDays[index] ? 'ring-4 ring-green-200 ring-offset-2' : ''}`}
                      >
                        {completedDays[index] && (
                          <Check className="w-6 h-6 text-white drop-shadow-md" />
                        )}
                        {!completedDays[index] && isToday && (
                          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      {completedDays[index] && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-orange-50 shadow-sm"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Info adicional */}
            <div className="grid grid-cols-2 gap-3">
              {protectedStreaks > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 flex items-center gap-2 border border-blue-200/50 shadow-sm">
                  <div className="bg-blue-600 rounded-lg p-1.5">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-blue-900">{protectedStreaks}</div>
                    <p className="text-blue-600 truncate">Protección</p>
                  </div>
                </div>
              )}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-3 flex items-center gap-2 border border-amber-200/50 shadow-sm">
                <div className="bg-amber-600 rounded-lg p-1.5">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-amber-900">{streakDays * 10}</div>
                  <p className="text-amber-600 truncate">Pts bonus</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 p-4 text-center shadow-md">
            <div className="text-blue-600 mb-1">24</div>
            <p className="text-gray-600">Reciclajes</p>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 p-4 text-center shadow-md">
            <div className="text-green-600 mb-1">5.2kg</div>
            <p className="text-gray-600">Total</p>
          </Card>
        </div>

        {/* Acciones rápidas */}
        <div className="mb-8">
          <h3 className="text-gray-800 mb-4">Acción Rápida</h3>
          <Button 
            onClick={() => setShowAchievements(true)}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 h-16 shadow-lg"
          >
            <Medal className="w-6 h-6 mr-3" />
            <span>Ver Mis Logros</span>
          </Button>
        </div>
      </div>

      {/* Navegación inferior fija */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl">
        <div className="grid grid-cols-3 max-w-md mx-auto">
          <button 
            onClick={() => setShowStore(true)}
            className="flex flex-col items-center py-4 px-6 hover:bg-green-50 transition-colors border-r border-gray-200"
          >
            <ShoppingBag className="w-6 h-6 text-green-600 mb-1" />
            <span className="text-gray-700">Tienda</span>
          </button>
          <button 
            onClick={() => setShowScanner(true)}
            className="flex flex-col items-center py-4 px-6 bg-green-50 border-r border-gray-200"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-600 rounded-full blur-md opacity-30"></div>
              <div className="relative bg-gradient-to-br from-green-600 to-emerald-600 p-3 rounded-full shadow-lg -mt-8">
                <QrCode className="w-7 h-7 text-white" />
              </div>
            </div>
            <span className="text-green-600 mt-2">Escanear</span>
          </button>
          <button 
            onClick={() => setShowRanking(true)}
            className="flex flex-col items-center py-4 px-6 hover:bg-green-50 transition-colors"
          >
            <Trophy className="w-6 h-6 text-green-600 mb-1" />
            <span className="text-gray-700">Ranking</span>
          </button>
        </div>
      </div>

      {/* Modal de resultado */}
      {showResult && (
        <ScanResult 
          qrData={scannedData}
          onClose={() => setShowResult(false)}
          onContinue={handleContinueAfterScan}
        />
      )}

      {/* Panel de notificaciones */}
      {showNotifications && (
        <Notifications onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
}