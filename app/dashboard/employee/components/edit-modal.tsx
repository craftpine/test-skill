import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import {
  AiOutlineDelete,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { SkillType } from "../page";
import { useEffect, useState } from "react";
import Select from "react-select";
import CONSTANTS from "@/constants";
import { NewSkill, Option } from "./create-modal";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { cloneDeep } from "lodash";

type Skill = {
  id: string;
  name: string;
  subSkills: Skill[];
  certifications: any[];
};

type EditModal = {
  isOpen: boolean;
  onOpenChange: () => void;
  skillOptions?: Skill[];
  skillOptionsLoading?: boolean;
  handleUpdateSkills: (oldId: string, data: SkillType) => void;
  currentSkills: Skill[];
  loading: boolean;
  skill: SkillType;
};

type Certification = {
  id: string;
  name: string;
  description: string;
};

const SKILL_OPTIONS = CONSTANTS.SKILLS.map((t) => ({
  value: t.id,
  label: t.name,
}));

export default function EditModal(props: EditModal) {
  const {
    isOpen,
    onOpenChange,
    skillOptions,
    skillOptionsLoading,
    handleUpdateSkills,
    currentSkills,
    loading,
    skill,
  } = props;

  const [updateSkill, setUpdateSkill] = useState<SkillType>({
    id: "",
    name: "",
    yearOfExperience: 1,
    ratingScore: 1,
    certifications: [],
  });

  const [selectedCert, setSelectedCert] = useState<Option>(
    null as unknown as Option
  );

  const getSkillOptions = (skillOptions?: Skill[]) => {
    const arr: { value: string; label: string; certifications: any[] }[] = [];

    function getSkillTree(
      skillOptions: Skill[],
      arr: { value: string; label: string; certifications: any[] }[]
    ) {
      skillOptions.forEach(({ id, name, subSkills, certifications }) => {
        if (!currentSkills.some((t) => t.id == id) || id === skill.id) {
          arr.push({ value: id, label: name, certifications });
        }
        if (subSkills?.length) {
          getSkillTree(subSkills, arr);
        }
      });
    }

    if (skillOptions) getSkillTree(skillOptions, arr);

    return arr;
  };

  // get all certs of current skill
  const getAllCerts = (): Certification[] => {
    if (!updateSkill.id) return [];
    return (
      getSkillOptions(skillOptions).find((t) => t.value === updateSkill.id)
        ?.certifications ?? []
    );
  };

  const getCerts = () => {
    const certifications = getAllCerts();

    return certifications.reduce(
      (
        acc: { value: string; label: string; description: string }[],
        current: { id: string; name: string; description: string }
      ) => {
        if (!updateSkill.certifications.some((t) => t.id == current.id)) {
          acc.push({
            value: current.id,
            label: current.name,
            description: current.description,
          });
        }

        return acc;
      },
      []
    );
  };

  const addCert = () => {
    selectedCert &&
      setUpdateSkill((skill: SkillType) => {
        skill?.certifications.push({
          id: selectedCert?.value,
          name: selectedCert?.label,
          desctipion: selectedCert?.description,
        });

        return { ...skill };
      });

    setSelectedCert(null as unknown as Option);
  };

  const deleteCert = (id: string) => {
    setUpdateSkill((skill) => ({
      ...skill,
      certifications: skill.certifications.filter((t) => t.id !== id),
    }));
  };

  const handleSetSelectedCert = (e: Option) => {
    setSelectedCert(e);
  };

  const onSubmit = () => {
    handleUpdateSkills(skill.id, updateSkill);
  };

  const handleClose = (cb: () => void) => {
    setUpdateSkill(cloneDeep(skill));
    cb();
  };

  useEffect(() => {
    if (skill) {
      const ratingScore: Option = { value: "", label: "" };

      CONSTANTS.SKILLS.forEach((t) => {
        if (+t.id === skill.ratingScore) {
          ratingScore.value = t.id;
          ratingScore.label = t.name;
        }
      });

      setUpdateSkill(cloneDeep(skill));
    }
  }, [skill.id]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="4xl"
      classNames={{
        base: "overflow-visible",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 ">
              Edit Skill {updateSkill?.name}
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-4 items-end">
                <div className="grow-[1]">
                  <label className="block font-medium text-tiny text-foreground pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none">
                    Skill name
                  </label>
                  <Select
                    options={getSkillOptions(skillOptions)}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    name="id"
                    value={getSkillOptions(skillOptions).find(
                      (t) => t.value === updateSkill?.id
                    )}
                    onChange={(e) => {
                      setUpdateSkill((t: any) => ({
                        ...t,
                        id: e?.value,
                        name: e?.label,
                        certifications: [],
                      }));
                      setSelectedCert(null as unknown as Option);
                    }}
                    isLoading={skillOptionsLoading}
                    loadingMessage={() => "Loading skill..."}
                  />
                </div>

                <div className="w-[180px]">
                  <Input
                    size="sm"
                    type="number"
                    name="yearOfExperience"
                    labelPlacement="outside"
                    placeholder="Year of Experience"
                    label="Year of Experience"
                    fullWidth={false}
                    value={"" + updateSkill?.yearOfExperience}
                    onChange={(e) =>
                      setUpdateSkill((t: any) => ({
                        ...t,
                        yearOfExperience: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="w-[140px]">
                  <label className="block font-medium text-tiny text-foreground pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none">
                    Leval
                  </label>
                  <Select
                    options={SKILL_OPTIONS}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    name="ratingScore"
                    value={SKILL_OPTIONS.find(
                      (t) => +t.value === updateSkill?.ratingScore
                    )}
                    onChange={(e) =>
                      setUpdateSkill((t: any) => ({
                        ...t,
                        ratingScore: e?.value ? +e.value : 0,
                      }))
                    }
                  />
                </div>
              </div>

              <div className=" rounded-md p-4 mt-2 flex gap-4 bg-gray-50">
                {getAllCerts().length > 0 && (
                  <div className=" w-full">
                    <h4 className="pb-[6px] font-bold">Certifications</h4>
                    <div className="grid gap-2">
                      <Listbox aria-label="Actions">
                        {updateSkill?.certifications.map((cert) => (
                          <ListboxItem
                            key={cert.id}
                            endContent={
                              <AiOutlineClose
                                size={12}
                                onClick={() => deleteCert(cert.id)}
                              />
                            }
                          >
                            {cert.name}
                          </ListboxItem>
                        ))}
                      </Listbox>

                      <div className="flex gap-2">
                        <Select
                          className="react-select-container w-full"
                          classNamePrefix="react-select"
                          options={getCerts()}
                          name="certifications"
                          value={selectedCert}
                          onChange={(e) => handleSetSelectedCert(e as Option)}
                        />
                        <Button
                          color="primary"
                          size="sm"
                          onPress={addCert}
                          isDisabled={!selectedCert}
                        >
                          <AiOutlineCheck />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="  w-full">
                  <h4 className=" font-bold">Note</h4>
                  <Textarea
                    labelPlacement="outside"
                    placeholder="Enter your note"
                    className="max-w-xs"
                  />
                </div>
                {/* </div> */}
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => handleClose(onClose)}
              >
                No, Keep it!
              </Button>
              <Button color="primary" onPress={onSubmit} isLoading={loading}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
