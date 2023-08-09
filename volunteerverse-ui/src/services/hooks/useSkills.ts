import { useEffect, useState } from "react";
import { apiClient } from "../ApiClient";

export const useSkills = () : {value: string, label:  string}[] => {
    // hook retrieves all skills from database and returns it each call
    // (for multi-select inputs only)
    const [skillsTags, setSkillsTags] = useState<string[]>([]);
    useEffect(() => {
        const getProjectTags = async () => {
          apiClient.fetchAllTags().then(({ data, success, error, statusCode }) => {
            // fecthes all all tags from db then sets state
            if (success) {
              console.log("setting tags: ", data.tags)
              const uniqueSkills = new Set<string>(data.tags);
              setSkillsTags(Array.from(uniqueSkills));
            } else {
                setSkillsTags([])
              console.log("unable to retrieve all tags. error: ", {error, statusCode})
            }
          });
        }
        getProjectTags();
      }, [])
      // returns skills in a map that is
    return skillsTags?.map((tag) => ({
        value: tag.toLocaleLowerCase(),
        label: tag
    }));
}

