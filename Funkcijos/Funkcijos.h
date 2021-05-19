#ifndef FUNKCIJOS_H_FUNKCIJOS
#define FUNKCIJOS_H_FUNKCIJOS
#include "My_lib.h"
#include "Tikrinimai.cpp"
#include "Rezultatai.cpp"
#include "Studentas.h"

string Rtikrinimas ();
int StudentuSK();
int Sktikrinimas();
int Paztikrinimas();
bool filetikrinimas(int n);
double vidurkis(vector<int> &pazymiai, int egzaminas);
double mediana(vector<int> &pazymiai, int egzaminas);
void filtras (vector<Studentas> &studentai, vector<Studentas> &nelaimingieji, string file);
template <class X>
void sortByVidurkis(X &);
template <class X> 
void sortByVidurkisList(X &);

#endif 