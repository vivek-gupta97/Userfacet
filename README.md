# Userfacet Online Assesment Project
ENDPOINTS-->
1--)http://localhost:3000
            it shows the list of surveys that can be conducted. s1 and s2
2--)http://localhost:3000/survey
            it creates and return survey.
3--)http://localhost:3000/survey/submit
            after submission, message responded "Survey submitted Success"
4--)http://localhost:3000/similarity/:surveyId?name=vivek&page=1&search=key&filter=high
            :surveyId--->id of the survey for which the similarity is calculated
            queryparameters--->
                    1- name(required)
                    2- search
                    3- page
                    4- filter--->high(60-100%) ,med(30-60%) ,low(0-30 %)
                                  
