cmake_minimum_required(VERSION 3.10)

project(2UZDUOTIS)

set(CMAKE_CXX_STANDARD 11)

include_directories(Funkcijos)

add_executable(2UZDUOTIS
 Funkcijos/Studentas.h
 Funkcijos/Studentas.cpp
 Funkcijos/Benchmark.cpp
 Funkcijos/Funkcijos.h
 Funkcijos/Isvedimai.cpp
 Funkcijos/Ivedimai.cpp
 Funkcijos/Main_h.h
 Funkcijos/My_lib.h
 Funkcijos/Rezultatai.cpp
 Funkcijos/Strategija2.cpp
 Funkcijos/Tikrinimai.cpp
 main.cpp)