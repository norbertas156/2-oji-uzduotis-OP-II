#ifndef MAIN_H_H_INCLUDED
#define MAIN_H_H_INCLUDED
#include "My_lib.h"
#include "Isvedimai.cpp"
#include "Ivedimai.cpp"
#include "Benchmark.cpp"
#include "Studentas.h"


template <class X>
void fileIvedimas (X &studentas, string file);
template <class X>
void Ivedimas(X &studentas);
template <class X>
void BenchmarkIvedimas (X &studentas, string file);
template <class X>
void Isvedimas(X &studentas);
template <class X>
void fileIsvedimas(X &);
void ListIsvedimas(list<Studentas> &);
void benchmark(int pasirinkimas);

#endif