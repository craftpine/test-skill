import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

type DeleteModalType = {
  isOpen: boolean;
  onOpenChange: () => void;
  skillName: string;
  handleDeleteSkill: () => void;
  loading: boolean;
};

export default function DeleteModal(props: DeleteModalType) {
  const {
    isOpen,
    onOpenChange,
    skillName = "",
    handleDeleteSkill,
    loading,
  } = props;
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Skill
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete the <b>{skillName}</b> skill
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                No, Keep it.
              </Button>
              <Button
                color="primary"
                onPress={handleDeleteSkill}
                isLoading={loading}
              >
                Yes, Delete!
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
