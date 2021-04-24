#include "My_lib.h"
#include "Studentas.h"


Studentas::Studentas(const string &vardas, const string &pavarde){
    vardas_=vardas;
    pavarde_=pavarde;
}


void Studentas::setPazymiai(int pazymys){
    pazymiai_.push_back(pazymys);
}

void Studentas::pasalintiPaskutiniPaz(){
    pazymiai_.pop_back();
}

void Studentas::egzaminoPaz(int pazymys){
    egzaminas_=pazymys;
}

void Studentas::setVidurkis(){
    vidurkis_=vidurkis(pazymiai_, egzaminas_);
}

void Studentas::setMediana(){
    mediana_=mediana(pazymiai_, egzaminas_);
}

bool compare (const Studentas &studentas1, const Studentas &studentas2){
return studentas1.galVidurkis()>studentas2.galVidurkis();
}