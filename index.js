// import marker from '@ajar/marker'; 
// console.log('hello node');



import fs from 'fs/promises';
import log from '@ajar/marker';

console.time('benchmark');
const DIR_PATH = './LEADS';
const users = [];
const usersIds = {};

// 1 - read the directory --> [filesNames...] : 
fs.readdir(DIR_PATH)
    .then((files_names) => {
             // 2 - loop over files names array:
        const pending = files_names.map((files_name) => {

            // 3 - read the text file:
            return fs.readFile(`${DIR_PATH}/${files_name}`)
                
                .catch(log.error);
        })

    // 4 - optional concat all files content into a global variable:
        Promise.all(pending)
            .then(content_array=> {
                const content = content_array.join('\r\n');
                                 // 5 - split file content into lines:
                const lines = content.split('\r\n');

                                // 6 - loop over lines:
                for (let line of lines) {
                                // 7 - split each line on ' , 'into array :
                    let [fb_id,full_name,email] = line.split(',');
                     // 7.5 -       if this is a new fresh user
                     if (!(fb_id in usersIds)) {
                                // 8 - remove " " charachters from full name:
                     full_name = full_name.slice(1,-1);

                                // 9 - build a user object:
                    const user = {fb_id, full_name, email};
                    // console.log(lines.length);

                                // 10 - push user object to global users array:
                    users.push(user);
                    usersIds[fb_id] = true;
                }
            }
                                // 11 - write users array into a json file
                return fs.writeFile('./users.json', JSON.stringify(users, null,2));
                
                
            })
        
            .then(() => {
                 // 12 - print the number of user
                log.info('number of users:', users.length);
                 // 13 - print the benchmark time 
                console.timeEnd('benchmark');

            })



    })













   








// (async () => {

    //     // 1 - read the directory --> [fileNames...]
//     // 2 - loop over file names array
//     // 3 -    read the text file
//     // 4 -    optional concat all files content into a global variable
//     // 5 -    split file content into lines
//     // 6 -    loop over line
//     // 7 -         split each line on , into array
//     // 7.5 -       if this is a new fresh user
//     // 8 -             remove " charachters from full name
//     // 9 -             build a user object
//     // 10 -            push user object to global users array
//     // 11 - write users array into a json file
//     // 12 - print the number of user
//     // 13 - print the benchmark time 
//     })().catch(log.error);