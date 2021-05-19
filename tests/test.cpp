#define CATCH_CONFIG_MAIN  // This tells Catch to provide a main() - only do this in one cpp file
#include "catch.hpp"
#include "../Funkcijos/My_lib.h"
#include "../Funkcijos/Main_h.h"
#include "../Funkcijos/Funkcijos.h"
#include "../Funkcijos/Studentas.h"



TEST_CASE( "Medianu ir vidurkiu skaiciavimas" ) {
vector<int> pazymiai = {5, 4, 3, 9, 1, 2};
int egzaminas = 10;
REQUIRE(vidurkis(pazymiai, egzaminas) == 7.6);
REQUIRE(mediana(pazymiai, egzaminas) == 7.4);
}

TEST_CASE("Isskirstymo i kietekus ir nelaiminguosius"){
    vector<Studentas>::iterator it;
    vector<Studentas> studentai;
    vector<Studentas> kietekai;
    vector<Studentas> nelaimingieji;
    Studentas studentasK("Jonas", "Kietasis");
    studentasK.setPazymiai(10);
    studentasK.setPazymiai(8);
    studentasK.setPazymiai(9);
    studentasK.setPazymiai(10);
    studentasK.egzaminoPaz(10);
    studentasK.setVidurkis();
    studentai.push_back(studentasK);
    Studentas studentasN("Arturas", "Nelaimingasis");
    studentasN.setPazymiai(3);
    studentasN.setPazymiai(4);
    studentasN.setPazymiai(2);
    studentasN.setPazymiai(4);
    studentasN.egzaminoPaz(1);
    studentasN.setVidurkis();
    studentai.push_back(studentasN);
    filtrasVector(studentai, kietekai, nelaimingieji, "Testinis");
    it=kietekai.begin();
    REQUIRE(it->vardas() == "Jonas");
    it=nelaimingieji.begin();
    REQUIRE(it->vardas() == "Arturas");
    
}