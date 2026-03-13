import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, Trash2, Tag, CheckSquare, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface CardDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardId: number;
  cardTitle: string;
  cardDescription?: string;
}

export default function CardDetailModal({
  isOpen,
  onClose,
  cardId,
  cardTitle,
  cardDescription,
}: CardDetailModalProps) {
  const utils = trpc.useUtils();

  // Queries
  const { data: labels, isLoading: isLoadingLabels } = trpc.labels.list.useQuery({ cardId }, { enabled: isOpen });
  const { data: checklists, isLoading: isLoadingChecklists } = trpc.checklists.list.useQuery({ cardId }, { enabled: isOpen });
  const { data: customFields, isLoading: isLoadingCustomFields } = trpc.customFields.list.useQuery({ cardId }, { enabled: isOpen });
  const { data: projectDates, isLoading: isLoadingDates } = trpc.projectDates.get.useQuery({ cardId }, { enabled: isOpen });

  // Mutations
  const addLabelMutation = trpc.labels.add.useMutation({
    onSuccess: () => {
      utils.labels.list.invalidate({ cardId });
      toast.success("Etiqueta adicionada");
    },
  });
  const deleteLabelMutation = trpc.labels.delete.useMutation({
    onSuccess: () => {
      utils.labels.list.invalidate({ cardId });
      toast.success("Etiqueta removida");
    },
  });
  const addChecklistMutation = trpc.checklists.add.useMutation({
    onSuccess: () => {
      utils.checklists.list.invalidate({ cardId });
      toast.success("Item de checklist adicionado");
    },
  });
  const updateChecklistMutation = trpc.checklists.update.useMutation({
    onSuccess: () => {
      utils.checklists.list.invalidate({ cardId });
    },
  });
  const deleteChecklistMutation = trpc.checklists.delete.useMutation({
    onSuccess: () => {
      utils.checklists.list.invalidate({ cardId });
      toast.success("Item de checklist removido");
    },
  });
  const addCustomFieldMutation = trpc.customFields.add.useMutation({
    onSuccess: () => {
      utils.customFields.list.invalidate({ cardId });
      toast.success("Campo personalizado adicionado");
    },
  });
  const deleteCustomFieldMutation = trpc.customFields.delete.useMutation({
    onSuccess: () => {
      utils.customFields.list.invalidate({ cardId });
      toast.success("Campo personalizado removido");
    },
  });
  const upsertDatesMutation = trpc.projectDates.upsert.useMutation({
    onSuccess: () => {
      utils.projectDates.get.invalidate({ cardId });
      toast.success("Datas atualizadas");
    },
  });
  const updateCardMutation = trpc.cards.update.useMutation({
    onSuccess: () => {
      utils.cards.getByList.invalidate();
      toast.success("Descrição atualizada");
    },
  });

  const [description, setDescription] = useState(cardDescription || "");
  const [newLabel, setNewLabel] = useState("");
  const [newLabelColor, setNewLabelColor] = useState("#4b4897");
  const [newChecklistTitle, setNewChecklistTitle] = useState("");
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");
  const [newFieldType, setNewFieldType] = useState<"text" | "select" | "date" | "number">("text");

  useEffect(() => {
    setDescription(cardDescription || "");
  }, [cardDescription]);

  const handleAddLabel = () => {
    if (!newLabel.trim()) {
      toast.error("Nome da etiqueta é obrigatório");
      return;
    }
    addLabelMutation.mutate({ cardId, label: newLabel, color: newLabelColor });
    setNewLabel("");
    setNewLabelColor("#4b4897");
  };

  const handleRemoveLabel = (id: number) => {
    deleteLabelMutation.mutate({ id });
  };

  const handleAddChecklist = () => {
    if (!newChecklistTitle.trim()) {
      toast.error("Título do checklist é obrigatório");
      return;
    }
    addChecklistMutation.mutate({ cardId, title: newChecklistTitle });
    setNewChecklistTitle("");
  };

  const handleToggleChecklist = (id: number, currentCompleted: number) => {
    updateChecklistMutation.mutate({ id, completed: currentCompleted === 0 });
  };

  const handleRemoveChecklist = (id: number) => {
    deleteChecklistMutation.mutate({ id });
  };

  const handleAddCustomField = () => {
    if (!newFieldName.trim() || !newFieldValue.trim()) {
      toast.error("Nome e valor do campo são obrigatórios");
      return;
    }
    addCustomFieldMutation.mutate({
      cardId,
      fieldName: newFieldName,
      fieldValue: newFieldValue,
      fieldType: newFieldType,
    });
    setNewFieldName("");
    setNewFieldValue("");
    setNewFieldType("text");
  };

  const handleRemoveCustomField = (id: number) => {
    deleteCustomFieldMutation.mutate({ id });
  };

  const handleUpdateDates = (type: "start" | "end", value: string) => {
    const startDate = type === "start" ? (value ? new Date(value) : undefined) : projectDates?.projectStartDate ? new Date(projectDates.projectStartDate) : undefined;
    const endDate = type === "end" ? (value ? new Date(value) : undefined) : projectDates?.projectEndDate ? new Date(projectDates.projectEndDate) : undefined;
    
    upsertDatesMutation.mutate({
      cardId,
      startDate,
      endDate,
    });
  };

  const handleSaveDescription = () => {
    updateCardMutation.mutate({
      id: cardId,
      description,
    });
  };

  const isLoading = isLoadingLabels || isLoadingChecklists || isLoadingCustomFields || isLoadingDates;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">{cardTitle}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : (
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="labels" className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                Etiquetas
              </TabsTrigger>
              <TabsTrigger value="checklist" className="flex items-center gap-1">
                <CheckSquare className="w-4 h-4" />
                Checklist
              </TabsTrigger>
              <TabsTrigger value="dates" className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Datas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4">
              <div className="p-4 rounded-lg bg-muted border border-border">
                <h3 className="font-semibold text-foreground mb-3">Descrição</h3>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Adicione uma descrição mais detalhada..."
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent min-h-[120px]"
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    size="sm" 
                    onClick={handleSaveDescription}
                    disabled={updateCardMutation.isPending}
                  >
                    {updateCardMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Salvar Descrição
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="labels" className="space-y-4">
              <Card className="p-4 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Adicionar Etiqueta</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="Nome da etiqueta"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-foreground">Cor:</label>
                      <input
                        type="color"
                        value={newLabelColor}
                        onChange={(e) => setNewLabelColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                    </div>
                    <Button
                      onClick={handleAddLabel}
                      disabled={addLabelMutation.isPending}
                      className="bg-accent text-accent-foreground hover:bg-accent/90 ml-auto"
                    >
                      {addLabelMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                      Adicionar
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Etiquetas</h3>
                {!labels || labels.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Nenhuma etiqueta adicionada</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {labels.map((label) => (
                      <div
                        key={label.id}
                        className="flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm"
                        style={{ backgroundColor: label.color || "#4b4897" }}
                      >
                        {label.label}
                        <button
                          onClick={() => handleRemoveLabel(label.id)}
                          disabled={deleteLabelMutation.isPending}
                          className="ml-1 hover:opacity-80"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="checklist" className="space-y-4">
              <Card className="p-4 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Adicionar Item de Checklist</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newChecklistTitle}
                    onChange={(e) => setNewChecklistTitle(e.target.value)}
                    placeholder="Título do item"
                    className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <Button
                    onClick={handleAddChecklist}
                    disabled={addChecklistMutation.isPending}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {addChecklistMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                    Adicionar
                  </Button>
                </div>
              </Card>

              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Itens do Checklist</h3>
                {!checklists || checklists.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Nenhum item de checklist</p>
                ) : (
                  <div className="space-y-2">
                    {checklists.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted border border-border">
                        <input
                          type="checkbox"
                          checked={item.completed === 1}
                          onChange={() => handleToggleChecklist(item.id, item.completed)}
                          className="w-5 h-5 rounded cursor-pointer"
                        />
                        <span
                          className={`flex-1 ${
                            item.completed === 1
                              ? "line-through text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {item.title}
                        </span>
                        <button
                          onClick={() => handleRemoveChecklist(item.id)}
                          disabled={deleteChecklistMutation.isPending}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="dates" className="space-y-4">
              <Card className="p-4 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Datas do Projeto</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Data de Início
                    </label>
                    <input
                      type="date"
                      value={projectDates?.projectStartDate ? new Date(projectDates.projectStartDate).toISOString().split('T')[0] : ""}
                      onChange={(e) => handleUpdateDates("start", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Data de Término
                    </label>
                    <input
                      type="date"
                      value={projectDates?.projectEndDate ? new Date(projectDates.projectEndDate).toISOString().split('T')[0] : ""}
                      onChange={(e) => handleUpdateDates("end", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-4 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Campos Personalizados</h3>
                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    placeholder="Nome do campo"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="text"
                    value={newFieldValue}
                    onChange={(e) => setNewFieldValue(e.target.value)}
                    placeholder="Valor do campo"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <select
                    value={newFieldType}
                    onChange={(e) => setNewFieldType(e.target.value as any)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="text">Texto</option>
                    <option value="select">Seleção</option>
                    <option value="date">Data</option>
                    <option value="number">Número</option>
                  </select>
                  <Button
                    onClick={handleAddCustomField}
                    disabled={addCustomFieldMutation.isPending}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {addCustomFieldMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                    Adicionar Campo
                  </Button>
                </div>

                {customFields && customFields.length > 0 && (
                  <div className="space-y-2">
                    {customFields.map((field) => (
                      <div key={field.id} className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border">
                        <div>
                          <p className="font-medium text-foreground">{field.fieldName}</p>
                          <p className="text-sm text-muted-foreground">{field.fieldValue}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveCustomField(field.id)}
                          disabled={deleteCustomFieldMutation.isPending}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        )}

        <div className="flex gap-3 justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
