#include "My_lib.h"
#include "Studentas.h"

Studentas::~Studentas()= default;

Studentas::Studentas(const Studentas& studentas){
    vardas_=studentas.vardas_;
    pavarde_=studentas.pavarde_;
    vidurkis_=studentas.vidurkis_;
    egzaminas_=studentas.egzaminas_;
    mediana_=studentas.mediana_;
    pazymiai_=studentas.pazymiai_;
}

Studentas &Studentas::operator=(const Studentas &studentas){

if (&studentas == this) return *this;

vardas_=studentas.vardas_;
pavarde_=studentas.pavarde_;
vidurkis_=studentas.vidurkis_;
egzaminas_=studentas.egzaminas_;
mediana_=studentas.mediana_;
pazymiai_=studentas.pazymiai_;
return *this;
}

const string &Studentas::vardas() const { return vardas_;}

const string &Studentas::pavarde() const { return pavarde_;}

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