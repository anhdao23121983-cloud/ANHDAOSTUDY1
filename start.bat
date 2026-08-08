@echo off
title Khoi dong Server - ANH DAO AI STUDY
echo ====================================================
echo   DANG KHOI DONG SERVER CHO WEBSITE CLASSROOM APP...
echo   Dia chi: http://localhost:3000
echo ====================================================
echo.
start http://localhost:3000
python -m http.server 3000 --directory frontend
pause
