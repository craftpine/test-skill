import CONSTANTS from "@/constants";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { useMemo, useRef, useState } from "react";
import Select from "react-select";
import {
  AiOutlineDelete,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineSave,
} from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Listbox, ListboxItem } from "@nextui-org/listbox";

type Skill = {
  id: string;
  name: string;
  subSkills: Skill[];
  certifications: any[];
};

type CreateModalType = {
  isOpen: boolean;
  onOpenChange: () => void;
  skillOptions?: Skill[];
  skillOptionsLoading?: boolean;
  handleAddNewSkills: (data: NewSkill[]) => void;
  currentSkills: Skill[];
  loading: boolean;
};

export type Option = {
  value: string;
  label: string;
  certifications?: any[];
  description?: string;
};

export type NewSkill = {
  id: Option;
  ratingScore: Option;
  yearOfExperience: string;
  certifications: any[];
};

export default function CreateSkillModal(props: CreateModalType) {
  const {
    isOpen,
    onOpenChange,
    skillOptions,
    skillOptionsLoading,
    handleAddNewSkills,
    currentSkills,
    loading,
  } = props;

  const [newSkills, setNewSkills] = useState<NewSkill[]>([]);

  const [id, setId] = useState<Option>({ value: "", label: "" });

  const [yearOfExperience, setYearOfExperience] = useState<string>("1");

  const [ratingScore, setRatingScore] = useState<Option>({
    value: "1",
    label: "Fundamental",
  });

  const [selectedCert, setSelectedCert] = useState<Option | null>();

  const [selectedCerts, setSelectedCerts] = useState<Option[]>([]);

  const addSkill = () => {
    setNewSkills((skills) => {
      skills.push({
        id,
        ratingScore,
        yearOfExperience: yearOfExperience ? yearOfExperience : "0",
        certifications: []
      });

      return [...skills];
    });

    setId({ value: "", label: "" });
  };

  const getSkillOptions = (skillOptions?: Skill[]) => {
    const arr: { value: string; label: string; certifications: any[] }[] = [];

    function getSkillTree(
      skillOptions: Skill[],
      arr: { value: string; label: string; certifications: any[] }[]
    ) {
      skillOptions.forEach(({ id, name, subSkills, certifications }) => {
        if (
          !newSkills.some((t) => t.id?.value == id) &&
          !currentSkills.some((t) => t.id == id)
        ) {
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

  const handleDeleteSkill = (id?: string) =>
    setNewSkills((skills) => skills.filter((t) => t.id?.value !== id));

  const canAddSkill = useMemo(
    () => id.value !== "" && yearOfExperience,
    [id.value, yearOfExperience]
  );

  const onChangeNewSkill = (skill: Option, e: Option, key: string) => {
    setNewSkills((skills) => {
      let currentSkill = skills.find((t) => t.id?.value === skill.value);

      if (currentSkill) {
        (currentSkill as any)[key] = e;
      }

      return [...skills];
    });
  };

  const onChangeNewYOE = (
    skill: Option,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewSkills((skills) => {
      let currentSkill = skills.find((t) => t.id?.value === skill.value);
      if (currentSkill) {
        currentSkill.yearOfExperience = e.target.value;
      }

      return [...skills];
    });
  };

  const onSubmit = () => {
    const data = newSkills.map((t) => {
      let tmpCerts: { id: string; name: string; description: string }[] = [];

      selectedCerts.forEach((cert) => {
        if (t.id.certifications?.some((ce) => ce.id === cert.value)) {
          tmpCerts.push({
            id: cert.value,
            name: cert.label,
            description: cert.description ?? "",
          });
        }
      });

      t.id.certifications = tmpCerts;

      return t;
    });

    setNewSkills([]);

    handleAddNewSkills(data);
  };

  const handleSetSelectedCert = (e: Option) => {
    setSelectedCert(e);
  };

  const addCert = () => {
    selectedCert && setSelectedCerts((certs) => [...certs, selectedCert]);
    setSelectedCert(null);
  };

  const deleteCert = (value: string) =>
    setSelectedCerts((certs) => certs.filter((t) => t.value !== value));

  const getCerts = (
    certifications: { id: string; name: string; description: string }[]
  ) => {
    return certifications?.reduce(
      (
        acc: { value: string; label: string; description: string }[],
        current: { id: string; name: string; description: string }
      ) => {
        if (!selectedCerts.some((t) => t.value == current.id)) {
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
              Create Skill
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-4 items-end">
                <div className="grow-[1] ">
                  <label className="block font-medium text-tiny text-foreground pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none">
                    Skill name
                  </label>
                  <Select
                    options={getSkillOptions(skillOptions)}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    name="id"
                    value={id}
                    onChange={(e) => setId(e as Option)}
                    isLoading={skillOptionsLoading}
                    loadingMessage={() => "Loading skill..."}
                  />
                </div>

                <div className="w-[180px]">
                  <Input
                    size="sm"
                    type="number"
                    name="yearOfExperience"
                    label="Year of Experience"
                    labelPlacement="outside"
                    placeholder="Year of Experience"
                    fullWidth={false}
                    value={yearOfExperience}
                    onChange={(e) => setYearOfExperience(e.target.value)}
                  />
                </div>

                <div className="w-[140px]">
                  <label className="block font-medium text-tiny text-foreground pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none">
                    Level
                  </label>
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={CONSTANTS.SKILLS.map((t) => ({
                      value: t.id,
                      label: t.name,
                    }))}
                    name="ratingScore"
                    value={ratingScore}
                    onChange={(e) => setRatingScore(e as Option)}
                  />
                </div>
                <Button
                  color="primary"
                  onPress={addSkill}
                  isDisabled={!canAddSkill}
                >
                  Add Skill
                </Button>
              </div>
              <Divider />
              {newSkills.map((skill) => (
                <>
                  <div
                    className="flex gap-4 items-center"
                    key={skill.id?.value}
                  >
                    <div className="grow-[1]">
                      <Select
                        options={getSkillOptions(skillOptions)}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Skill name"
                        name="id"
                        defaultValue={skill.id}
                        onChange={(e) =>
                          onChangeNewSkill(
                            skill.id as Option,
                            e as Option,
                            "id"
                          )
                        }
                      />
                    </div>

                    <div className="w-[180px]">
                      <Input
                        size="sm"
                        type="number"
                        name="yearOfExperience"
                        placeholder="Year of Experience"
                        fullWidth={false}
                        value={skill.yearOfExperience}
                        onChange={(e) => onChangeNewYOE(skill.id as Option, e)}
                      />
                    </div>

                    <div className="w-[140px]">
                      <Select
                        className="react-select-container"
                        classNamePrefix="react-select"
                        options={CONSTANTS.SKILLS.map((t) => ({
                          value: t.id,
                          label: t.name,
                        }))}
                        name="ratingScore"
                        defaultValue={skill.ratingScore}
                        onChange={(e) =>
                          onChangeNewSkill(
                            skill.ratingScore as Option,
                            e as Option,
                            "ratingScore"
                          )
                        }
                      />
                    </div>

                    <Button
                      variant="light"
                      color="danger"
                      className="text-lg text-danger cursor-pointer active:opacity-50 w-[90px]"
                    >
                      <AiOutlineDelete
                        onClick={() => handleDeleteSkill(skill.id?.value)}
                      />
                    </Button>
                  </div>

                  <Accordion
                    className="py-0"
                    itemClasses={{
                      heading: "-py-2 title-custom",
                      title: "py-0 ",
                      titleWrapper: "py-0",
                      base: "py-0",
                      content: "py-0 content-custom",
                      subtitle: "py-0",
                      startContent: "py-0",
                    }}
                  >
                    <AccordionItem
                      className="x-3"
                      key="1"
                      aria-label={`Accordion ${skill.id}`}
                      title={
                        <p className="underline text-end text-gray-500 text-xs cursor-pointer italic">
                          Add certification
                        </p>
                      }
                      isCompact={true}
                      hideIndicator={true}
                    >
                      <div className=" rounded-md p-4 mt-2 flex gap-4 bg-gray-50">
                        {skill.id?.certifications &&
                          skill.id?.certifications.length > 0 && (
                            <div className=" w-full">
                              <h4 className="pb-[6px] font-bold">
                                Certifications
                              </h4>
                              <div className="grid gap-2">
                                <Listbox aria-label="Actions">
                                  {selectedCerts.map((cert) => (
                                    <ListboxItem
                                      key={cert.value}
                                      endContent={
                                        <AiOutlineClose
                                          size={12}
                                          onClick={() => deleteCert(cert.value)}
                                        />
                                      }
                                    >
                                      {cert.label}
                                    </ListboxItem>
                                  ))}
                                </Listbox>

                                <div className="flex gap-2">
                                  <Select
                                    className="react-select-container w-full"
                                    classNamePrefix="react-select"
                                    options={getCerts(skill.id?.certifications)}
                                    name="certifications"
                                    value={selectedCert}
                                    onChange={(e) =>
                                      handleSetSelectedCert(e as Option)
                                    }
                                  />
                                  <Button
                                    color="primary"
                                    size="sm"
                                    onPress={addCert}
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
                    </AccordionItem>
                  </Accordion>

                  <Divider />
                </>
              ))}
              {/* </div> */}
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={onSubmit}
                isDisabled={!newSkills.length}
                isLoading={loading}
                startContent={<BiSave />}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
