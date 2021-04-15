#ifndef MAIN_H_H_INCLUDED
#define MAIN_H_H_INCLUDED
#include "My_lib.h"
#include "Isvedimai.cpp"
#include "Ivedimai.cpp"
#include "Benchmark.cpp"


void fileIvedimas (Studentas &studentai, string file);
void Ivedimas(Studentas &studentas);
void BenchmarkIvedimas (Studentas &studentai, string file);
void Isvedimas(Studentas &studentas);
void fileIsvedimas(Studentas &studentas);
void ListIsvedimas(list<Studentas> &studentas);
void benchmark(int pasirinkimas);

#endif