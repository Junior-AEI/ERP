<template>
    <div>

        <div class="flex flex-1 flex-row gap-2 ">

            <div class="flex flex-col gap-2 w-fit">

                <Wrapper class="flex flex-1 flex-col gap-2 w-fit">
                    <div class="flex flex-1 flex-row justify-between items-center">

                        <h2 class="border-b-0 p-0">Informations</h2>
                        <Button variant="outline" icon="star">Suivre l'Étude</Button>
                    </div>

                    <Card class="flex flex-1 w-fit">

                        <CardContent class="flex flex-1 mr-3 ml-3">
                            <ProjectInfos :infos="infos_project">

                            </ProjectInfos>
                        </CardContent>
                    </Card>

                    <div class="flex flex-1 flex-row justify-between items-center gap-2">
                        <Button variant="outline" icon="edit">Modifier l'Étude</Button>
                        <Button variant="destructive" icon="archive">Archiver l'Étude</Button>
                    </div>

                </Wrapper>
                <Wrapper class="flex flex-1 flex-col gap-2 min-w-sm">
                    <Card>
                        <CardHeader class="flex flex-1 justify-between">
                            <div class="flex flex-1 flex-row gap-2">
                                <Icon name="description" />
                                <span class="text-accent"> Documents </span>
                            </div>
                            <Button variant="outline" icon="add"></Button>
                        </CardHeader>
                        <CardContent class="flex flex-row flex-wrap">
                            <DocumentCard class="flex-1" v-for="doc in documents"
                            :infos="doc"></DocumentCard>
                        </CardContent>
                    </Card>
                </Wrapper>
            </div>
            <div class="flex flex-1 flex-col gap-2 ">


                <Wrapper class="flex flex-1 flex-col gap-4" >

                    <Card>
                        <CardContent>

                            
                        </CardContent>
                    </Card>

                    <div class="flex flex-col h-fit gap-2">

                        <h3>Notes sur l'avancement de l'Étude</h3>
                        
                        <ProjectNoteViewer :projectId="projectId"></ProjectNoteViewer>

                    </div>

                </Wrapper>
            </div>


        </div>
    </div>

</template>

<script setup lang="ts">
import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { type ExtendedProject } from '@/types/api';

import { type DocumentFull, type Project, type Person, type Client, type Address, type ClientInfo, type ProjectInfo } from '@/types/api';


function convertToNumber(input: string | string[]): number {
  if (Array.isArray(input)) {
    // C'est un tableau de chaînes de caractères, donc nous devons convertir chaque élément en nombre
    return input.map((str) => Number(str))[0];
  } else {
    // C'est une chaîne de caractères unique, donc nous la convertissons simplement en nombre
    return Number(input);
  }
}

const route = useRoute();
const projectId = convertToNumber(route.params.projectId);

const exampleDocument: DocumentFull = {
    documentId: 1,
    name: 'Example Document',
    type: 'PDF',
    path: 'example.pdf',
    version: 1,
    createdAt: '2021-01-01',
    typeId: 1, // Replace with the actual type ID
    information: 'Example information',
    status: 'Example status',
    authorId: 1, // Replace with the actual author ID
    fieldNumber: 3,
    fieldMeaning: 'Example field meaning'
};

const documents = ref<DocumentFull[]>([exampleDocument]);


const examplePerson: Person = {
    personId: 1,
    lastname: 'Doe',
    firstname: 'John',
    gender: 'Male',
    mobilePhone: '0612345678',
    landlinePhone: '0123456789',
    email: 'john.doe@example.com',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01'
};

const exampleAddress: Address = {
    addressId: 1,
    address: '123 Main St',
    additionnalAddress: 'Apt 4',
    city: 'Paris',
    postCode: '75000',
    country: 'France'
};

const exampleClientInfo: ClientInfo = {
    ...examplePerson,
    ...exampleAddress,
    function: 'Project Manager',
    firstContact: '2021-01-02',
    name: 'Example Company',
    legalEntity: 'SA',
    companyId: 1,
    companyType: 'IT Services'
};

const exampleProject: Project = {
    projectId: 1,
    acronym: 'EXPRJ',
    nameProject: 'Example Project',
    startDate: '2021-01-03',
    endDate: '2021-12-31',
    clientId: 1
};

const exampleProjectInfo: ProjectInfo = {
    ...exampleProject,
    ...exampleClientInfo
};

const exampleContributors: Person[] = [
    {
        personId: 2,
        lastname: 'Smith',
        firstname: 'Jane',
        gender: 'Female',
        mobilePhone: '0698765432',
        landlinePhone: '0198765432',
        email: 'jane.smith@example.com',
        createdAt: '2021-01-04',
        updatedAt: '2021-01-04'
    },
    // ... other contributors
];

const exampleProjectManagers: Person[] = [
    {
        personId: 3,
        lastname: 'Brown',
        firstname: 'Bob',
        gender: 'Male',
        mobilePhone: '0623456789',
        landlinePhone: '0123456789',
        email: 'bob.brown@example.com',
        createdAt: '2021-01-05',
        updatedAt: '2021-01-05'
    },
    // ... other project managers
];
// Deuxième exemple de projet
const examplePerson2: Person = {
    personId: 4,
    lastname: 'Doe',
    firstname: 'Alice',
    gender: 'Female',
    mobilePhone: '0612345678',
    landlinePhone: '0123456789',
    email: 'alice.doe@example.com',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01'
};

const exampleAddress2: Address = {
    addressId: 2,
    address: '456 Main St',
    additionnalAddress: 'Apt 2',
    city: 'Lyon',
    postCode: '69000',
    country: 'France'
};

const exampleClientInfo2: ClientInfo = {
    ...examplePerson2,
    ...exampleAddress2,
    function: 'Project Manager',
    firstContact: '2021-01-02',
    name: 'Example Company 2',
    legalEntity: 'SAS',
    companyId: 2,
    companyType: 'IT Services'
};

const exampleProject2: Project = {
    projectId: 2,
    acronym: 'EXPRJ2',
    nameProject: 'Example Project 2',
    startDate: '2021-02-01',
    endDate: '2022-02-28',
    clientId: 2
};

const exampleProjectInfo2: ProjectInfo = {
    ...exampleProject2,
    ...exampleClientInfo2
};

const exampleContributors2: Person[] = [
    {
        personId: 5,
        lastname: 'Smith',
        firstname: 'Charlie',
        gender: 'Male',
        mobilePhone: '0698765432',
        landlinePhone: '0198765432',
        email: 'charlie.smith@example.com',
        createdAt: '2021-02-01',
        updatedAt: '2021-02-01'
    },
    {
        personId: 6,
        lastname: 'Johnson',
        firstname: 'Emma',
        gender: 'Female',
        mobilePhone: '0611111111',
        landlinePhone: '0111111111',
        email: 'emma.johnson@example.com',
        createdAt: '2021-02-01',
        updatedAt: '2021-02-01'
    }
];

const exampleProjectManagers2: Person[] = [
    {
        personId: 7,
        lastname: 'Brown',
        firstname: 'Oliver',
        gender: 'Male',
        mobilePhone: '0623456789',
        landlinePhone: '0123456789',
        email: 'oliver.brown@example.com',
        createdAt: '2021-02-01',
        updatedAt: '2021-02-01'
    },
    {
        personId: 8,
        lastname: 'Davis',
        firstname: 'Sophia',
        gender: 'Female',
        mobilePhone: '0633333333',
        landlinePhone: '0133333333',
        email: 'sophia.davis@example.com',
        createdAt: '2021-02-01',
        updatedAt: '2021-02-01'
    }
];

const exampleExtendedProject2: ExtendedProject = {
    ...exampleProjectInfo2,
    delta: 'This is a delta for project 2',
    contributors: exampleContributors2,
    projectManagers: exampleProjectManagers2
};

// Troisième exemple de projet
const examplePerson3: Person = {
    personId: 9,
    lastname: 'Doe',
    firstname: 'Michael',
    gender: 'Male',
    mobilePhone: '0612345678',
    landlinePhone: '0123456789',
    email: 'michael.doe@example.com',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01'
};

const exampleAddress3: Address = {
    addressId: 3,
    address: '789 Main St',
    additionnalAddress: 'Apt 3',
    city: 'Marseille',
    postCode: '13000',
    country: 'France'
};

const exampleClientInfo3: ClientInfo = {
    ...examplePerson3,
    ...exampleAddress3,
    function: 'Project Manager',
    firstContact: '2021-01-02',
    name: 'Example Company 3',
    legalEntity: 'SARL',
    companyId: 3,
    companyType: 'IT Services'
};

const exampleProject3: Project = {
    projectId: 3,
    acronym: 'EXPRJ3',
    nameProject: 'Example Project 3',
    startDate: '2021-03-01',
    endDate: '2022-03-31',
    clientId: 3
};

const exampleProjectInfo3: ProjectInfo = {
    ...exampleProject3,
    ...exampleClientInfo3
};

const exampleContributors3: Person[] = [
    {
        personId: 10,
        lastname: 'Smith',
        firstname: 'Lucas',
        gender: 'Male',
        mobilePhone: '0698765432',
        landlinePhone: '0198765432',
        email: 'lucas.smith@example.com',
        createdAt: '2021-03-01',
        updatedAt: '2021-03-01'
    },
    {
        personId: 11,
        lastname: 'Johnson',
        firstname: 'Mia',
        gender: 'Female',
        mobilePhone: '0611111111',
        landlinePhone: '0111111111',
        email: 'mia.johnson@example.com',
        createdAt: '2021-03-01',
        updatedAt: '2021-03-01'
    }
];

const exampleProjectManagers3: Person[] = [
    {
        personId: 12,
        lastname: 'Brown',
        firstname: 'Ava',
        gender: 'Female',
        mobilePhone: '0623456789',
        landlinePhone: '0123456789',
        email: 'ava.brown@example.com',
        createdAt: '2021-03-01',
        updatedAt: '2021-03-01'
    },
    {
        personId: 13,
        lastname: 'Davis',
        firstname: 'Ethan',
        gender: 'Male',
        mobilePhone: '0633333333',
        landlinePhone: '0133333333',
        email: 'ethan.davis@example.com',
        createdAt: '2021-03-01',
        updatedAt: '2021-03-01'
    }
];

const exampleExtendedProject3: ExtendedProject = {
    ...exampleProjectInfo3,
    delta: 'This is a delta for project 3',
    contributors: exampleContributors3,
    projectManagers: exampleProjectManagers3
};


const exampleExtendedProject: ExtendedProject = {
    ...exampleProjectInfo,
    delta: '2 jours',
    contributors: exampleContributors,
    projectManagers: exampleProjectManagers
};

const infos = ref<ExtendedProject>()

axios.get(`/project/${projectId}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})
    .then((response) => {
        infos.value = response.data.data.project
    })
    .catch((error) => {
        console.log(error)
    })


const infos_project = ref<ExtendedProject>(exampleExtendedProject)

</script>
