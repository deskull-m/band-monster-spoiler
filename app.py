import streamlit as st
#import pandas as pd
    
st.title("Bakabakaband Monster Spoiler")

with open("bakabakaband/lib/edit/MonsterRaceDefinitions.txt", "r") as f:
#with open("bakabakaband/lib/edit/TownDefinitionList.txt", "r") as f:
    for s in f:
        if len(s) > 2 and s[0:2] == 'N:':
            st.write(s)
