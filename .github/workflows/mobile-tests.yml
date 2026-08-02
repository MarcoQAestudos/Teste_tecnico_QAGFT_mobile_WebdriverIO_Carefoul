#!/bin/bash
set -e

export PATH=$ANDROID_HOME/platform-tools:$PATH

echo "Verificando dispositivos conectados..."
adb wait-for-device
adb devices

echo "Aguardando boot completo do emulador (até 180 segundos)..."
counter=0
while [ $counter -lt 180 ]; do
  boot_status=$(adb shell getprop sys.boot_completed 2>/dev/null || echo "offline")
  boot_status=$(echo "$boot_status" | tr -d '\r' | tr -d '\n')
  
  if [ "$boot_status" = "1" ]; then
    echo "✓ Emulador iniciado com sucesso!"
    break
  fi
  
  counter=$((counter + 1))
  echo "Tentativa $counter: Aguardando emulador... (Status: $boot_status)"
  sleep 1
done

echo "Status final do boot:"
adb shell getprop sys.boot_completed

echo "Aguardando 10 segundos extras para garantir estabilidade..."
sleep 10

echo "Iniciando testes..."
npm run test:android:ci
